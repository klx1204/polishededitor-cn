import charmap from '$data/charmap.json';
import charmapZh from '$data/i18n/charmap-zh.json';

const ZH_UNKNOWN = '\uE000';

const zhCodeToChar = new Map<number, string>();
const zhCharToCode = new Map<string, number>();
for (const [hex, char] of Object.entries(charmapZh as Record<string, string>)) {
	const code = parseInt(hex, 16);
	zhCodeToChar.set(code, char);
	// Prefer ordinary 2-byte codes when writing. Skip combined glyphs (PP/HP) and
	// codes whose low byte collides with the 0x53 terminator.
	if (code > 0x4000 || (code & 0xff) === 0x53) continue;
	if (!zhCharToCode.has(char)) zhCharToCode.set(char, code);
}

export const chineseCharMap = charmapZh as Record<string, string>;
export const chineseCodes = zhCodeToChar;

/** True if a parsed name contains Chinese characters or preserved unknown codes. */
export function hasChineseName(name: string[]): boolean {
	return name.some(
		(ch) => ch.startsWith(ZH_UNKNOWN) || zhCharToCode.has(ch) || /[\u3400-\u9fff]/.test(ch)
	);
}

/** Render a name array for display, hiding private-use unknown-code tokens. */
export function displayName(name: string[]): string {
	return name.map((ch) => (ch.startsWith(ZH_UNKNOWN) ? '〔?〕' : ch)).join('');
}

function looksChinese(file: Uint8Array, address: number, length: number): boolean {
	// Chinese names are stored as big-endian 16-bit glyph codes. English names use
	// single-byte charmap codes, so a known Chinese code in the first pair is a
	// reliable signal. Also allow a single leading ASCII character (for names like
	// "A梦"), but do not scan deep into the field: uninitialized English name
	// fields can contain byte pairs that coincidentally look like Chinese codes.
	if (address + 1 >= file.length) return false;
	const first = (file[address] << 8) | file[address + 1];
	if (zhCodeToChar.has(first)) return true;
	if (file[address] < 0x40 && address + 3 < file.length) {
		const second = (file[address + 2] << 8) | file[address + 3];
		return zhCodeToChar.has(second);
	}
	return false;
}

function readChineseString(file: Uint8Array, address: number, length: number): string[] {
	const name: string[] = [];
	for (let i = 0; i + 1 < length; i += 2) {
		const hi = file[address + i];
		const lo = file[address + i + 1];
		if (hi === 0x00 || hi === 0x53 || hi === 0xff) break;
		const code = (hi << 8) | lo;
		const char = zhCodeToChar.get(code);
		name.push(char ?? `${ZH_UNKNOWN}${code.toString(16).toUpperCase().padStart(4, '0')}`);
	}
	return name;
}

//This function accesses a subset of bytes and interprets them as one number in big endian format.
export function retrieve(file: Uint8Array, address: number, bytes: number): number {
	let result = 0;
	for (let i = 0; i < bytes; i++) {
		result = (result << 8) | file[address + i];
	}
	return result;
}

//This function takes a number and inserts it into a buffer array in big endian format.
export function insert(file: Uint8Array, address: number, bytes: number, x: number): Uint8Array {
	for (let i = 0; i < bytes; i++) {
		file[address + i] = (x >> ((bytes - i - 1) * 8)) & 0xff;
	}
	return file;
}

export function readString(
	file: Uint8Array,
	address: number,
	length: number,
	hasChecksum: boolean
): string[] {
	if (looksChinese(file, address, length)) {
		return readChineseString(file, address, length);
	}

	const name = [];
	for (let i = 0; i < length; i++) {
		//Strings including checksums in their MSBs will always have their MSBs set for decoding.
		let byte = file[address + i];
		if (hasChecksum) {
			byte |= 0x80;
		}
		//Terminators (0x53 if there's no checksum, 0xFB if there is)
		if (byte === 0x53 || byte === 0xfb) break;
		//Space (0x7F if there's no checksum, 0xFA if there is)
		if (byte === 0x7f || byte === 0xfa) {
			name.push(' ');
			continue;
		}
		//Zero (0x00 if there's no checksum, 0xFC if there is)
		if (byte === 0 || byte === 0xfc) {
			name.push('0');
			continue;
		}
		name.push(charmap[byte.toString(16).toUpperCase() as keyof typeof charmap] ?? '?');
	}
	return name;
}

function writeChineseString(
	file: Uint8Array,
	address: number,
	length: number,
	name: string[],
	padByte: number
): void {
	const bytes: number[] = [];
	for (const ch of name) {
		let code: number | undefined;
		if (ch.startsWith(ZH_UNKNOWN)) {
			code = parseInt(ch.slice(ZH_UNKNOWN.length), 16);
		} else {
			code = zhCharToCode.get(ch);
		}
		if (code === undefined) continue;
		if (bytes.length + 2 > length - 1) break;
		bytes.push((code >> 8) & 0xff, code & 0xff);
	}
	if (bytes.length + 2 <= length) bytes.push(0x53, 0x53);
	else bytes.push(0x53);
	for (let i = bytes.length; i < length; i++) bytes.push(padByte);
	for (let i = 0; i < length; i++) file[address + i] = bytes[i];
}

export function writeString(
	file: Uint8Array,
	address: number,
	length: number,
	name: string[],
	hasChecksum: boolean,
	padByte = hasChecksum ? 0xfb : 0x53
): Uint8Array {
	if (hasChineseName(name)) {
		writeChineseString(file, address, length, name, padByte);
		return file;
	}

	for (let i = 0; i < name.length; i++) {
		//Space (0x7F if there's no checksum, 0xFA if there is)
		if (name[i] === ' ') {
			file[address + i] = hasChecksum ? 0xfa : 0x7f;
			continue;
		}
		//Zero (0x00 if there's no checksum, 0xFC if there is)
		if (name[i] === '0' && hasChecksum) {
			file[address + i] = 0xfc;
			continue;
		}
		file[address + i] = parseInt(
			Object.keys(charmap).find((c) => charmap[c as keyof typeof charmap] === name[i]) ?? '53',
			16
		);
	}
	//Once we finish the name, we should add the terminator,
	//unless it's already max length. In addition, the remaining
	//bytes should be filled with dummy values.
	if (length === name.length) return file;
	const englishPad = hasChecksum ? 0xfb : 0x53;
	file[address + name.length] = englishPad;
	for (let i = name.length + 1; i < length; i++) {
		file[address + i] = englishPad;
	}
	return file;
}
