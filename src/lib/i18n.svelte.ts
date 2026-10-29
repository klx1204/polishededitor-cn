import { browser } from '$app/environment';
import abilitiesZh from '$data/i18n/abilities-zh.json';
import charmapZh from '$data/i18n/charmap-zh.json';
import formsZh from '$data/i18n/forms-zh.json';
import itemsZh from '$data/i18n/items-zh.json';
import locationsZh from '$data/i18n/locations-zh.json';
import movesZh from '$data/i18n/moves-zh.json';
import naturesZh from '$data/i18n/natures-zh.json';
import pokemonZh from '$data/i18n/pokemon-zh.json';
import typesZh from '$data/i18n/types-zh.json';

export type Lang = 'zh' | 'en';
export type PF = 'polished' | 'faithful';
export type NameKind =
	| 'move'
	| 'item'
	| 'pokemon'
	| 'ability'
	| 'location'
	| 'nature'
	| 'type'
	| 'form';

type Entry = string | { p: string; f: string };
const maps: Record<NameKind, Record<string, Entry>> = {
	move: movesZh as Record<string, Entry>,
	item: itemsZh as Record<string, Entry>,
	pokemon: pokemonZh as Record<string, string>,
	ability: abilitiesZh as Record<string, string>,
	location: locationsZh as Record<string, string>,
	nature: naturesZh as Record<string, string>,
	type: typesZh as Record<string, string>,
	form: formsZh as Record<string, string>
};

const dictionary = {
	en: {
		appTitle: 'Polished Editor',
		appSubtitle: 'Save editor for Polished Crystal',
		language: 'Language',
		chinese: '中文',
		english: 'EN',
		polished: 'Polished',
		faithful: 'Faithful',
		uploadSave: 'Upload Save',
		downloadSave: 'Download Save',
		saveHint: '.SRM / .SAV / .SaveRAM (Max. 33kB).',
		party: 'Party',
		boxes: 'Boxes',
		bag: 'Bag',
		player: 'Player',
		pokedex: 'Pokédex',
		saveValidated: 'Save Validated!',
		notSaveFile:
			"This doesn't seem like a save file. Make sure that it isn't an emulator save state.",
		wrongVersion: 'This save file is not of the latest version. The current version is',
		unexpectedBug: 'An unexpected bug has occurred. Please report this to Rev3lation.',
		instructions: 'Instructions for use:',
		step1: 'Toggle between Polished/Faithful mode depending on your game.',
		step2: 'Upload your save file. It should be a battery save, not an emulator save state.',
		step3: 'Edit your save data as desired.',
		step4:
			'Download the edited save and replace your original save with it. Remember to backup your original save.',
		step5: 'Rename your edited save to match the original one.',
		intro:
			'Polished Editor is a save editor/cheat device for Polished Crystal. It auto-updates by scraping game files.',
		contact:
			'Contact Rev3lation on the Polished Crystal Discord Server (in #save-editor) to report bugs (bad eggs, corrupted saves, etc).',
		disclaimer: 'I am not responsible for any corrupted saves - please backup your original saves.',
		credits: 'Credits: Rev3lation, Sylvie (Rangi42), Cammy, Emi, FIQ, Darsh',
		github: 'GitHub Repository',
		name: 'Name',
		id: 'ID',
		money: 'Money',
		model: 'In-Game Model',
		rival: 'Rival',
		empty: 'Empty',
		box: 'Box',
		theme: 'Theme',
		changeEveryEntry: 'CHANGE EVERY ENTRY:',
		unknown: 'Unknown',
		seen: 'Seen',
		caught: 'Caught',
		items: 'Items',
		medicine: 'Medicine',
		balls: 'Balls',
		tmsHms: 'TMs & HMs',
		berries: 'Berries',
		keyItems: 'Key Items',
		extras: 'Extras',
		gameCornerCoins: 'Game Corner Coins',
		blueCardPoints: 'Blue Card Points',
		candy: 'Candy',
		apricorns: 'Apricorns',
		wings: 'Wings',
		nickname: 'Nickname',
		resetNickname: 'Reset Nickname',
		resetNicknameHint: 'Reset to the species name',
		speciesForm: 'Species & Form',
		heldItem: 'Held Item',
		noHeldItem: 'This Pokémon has no held item.',
		ability: 'Ability',
		level: 'Level',
		currentHp: 'Current HP%',
		status: 'Status',
		sleepDuration: 'Sleep Duration',
		hatchCycles: 'Hatch Cycles',
		happiness: 'Happiness',
		gender: 'Gender',
		male: 'Male',
		female: 'Female',
		genderless: 'This Pokémon is genderless.',
		shininess: 'Shininess',
		shiny: 'Shiny',
		notShiny: 'Not Shiny',
		isEgg: 'Is Egg',
		isEggTrue: 'Is Egg',
		isEggFalse: 'Is Not Egg',
		pokerus: 'Pokérus',
		none: 'None',
		cured: 'Cured',
		strain: 'Strain',
		daysRemaining: 'Days Remaining',
		originalTrainer: 'Original Trainer',
		caughtData: 'Caught Data',
		timeOfDay: 'Time of Day',
		day: 'Day',
		night: 'Night',
		morning: 'Morning',
		evening: 'Evening',
		ball: 'Ball',
		location: 'Location',
		moves: 'Moves',
		powerPoints: 'Power Points',
		ppUps: 'PP Ups Used',
		basePower: 'Base Power',
		accuracy: 'Accuracy',
		maxPp: 'Max PP',
		category: 'Category',
		effectChance: 'Effect Chance',
		physical: 'Physical',
		special: 'Special',
		statusMove: 'Status',
		determinantValues: 'Determinant Values',
		hp: 'HP',
		atk: 'Atk',
		def: 'Def',
		speed: 'Speed',
		spAtk: 'Sp. Atk',
		spDef: 'Sp. Def',
		hiddenPower: 'Hidden Power',
		effortValues: 'Effort Values',
		hyperTraining: 'Hyper Training',
		nature: 'Nature',
		sleep: 'Sleep',
		paralysis: 'Paralysis',
		burn: 'Burn',
		freeze: 'Freeze',
		poison: 'Poison',
		deletePokemon: 'Delete Pokémon',
		edit: 'Edit',
		heal: 'Heal',
		fainted: 'FNT',
		levelUpMoves: 'Level-Up Moves',
		eggMoves: 'Egg Moves',
		evoMove: 'Evo Move',
		tmhmMoves: 'TMs & HMs',
		allMoves: 'All Moves',
		search: 'Search',
		backspace: '← Backspace',
		done: 'Done',
		editingText: 'Editing text',
		characters: 'characters',
		increased: '↑',
		decreased: '↓',
		basics: 'Basics',
		stats: 'Stats',
		caughtTab: 'Caught',
		misc: 'Misc',
		chineseSave: 'Chinese save',
		chineseSaveHint: '2-byte Chinese names are detected automatically.',
		unknownChars: 'Some characters are not in the Chinese charmap and will be kept as-is.'
	},
	zh: {
		appTitle: '抛光水晶编辑器',
		appSubtitle: '宝可梦 抛光水晶 存档修改器',
		language: '语言',
		chinese: '中文',
		english: 'EN',
		polished: '抛光版',
		faithful: '原典版',
		uploadSave: '上传存档',
		downloadSave: '下载存档',
		saveHint: '.SRM / .SAV / .SaveRAM（最大 33kB）',
		party: '队伍',
		boxes: '盒子',
		bag: '背包',
		player: '玩家',
		pokedex: '图鉴',
		saveValidated: '存档校验通过！',
		notSaveFile: '这看起来不像存档文件。请确认不是模拟器即时存档。',
		wrongVersion: '这个存档不是最新版本。当前版本是',
		unexpectedBug: '发生未知错误，请向 Rev3lation 反馈。',
		instructions: '使用说明：',
		step1: '根据你的游戏版本，在“抛光版 / 原典版”之间切换。',
		step2: '上传存档文件。应该是电池存档，不是模拟器即时存档。',
		step3: '按需修改存档内容。',
		step4: '下载修改后的存档，替换原存档。记得先备份原存档。',
		step5: '把修改后的存档改名，与原来的存档文件名保持一致。',
		intro:
			'抛光水晶编辑器是一个面向《宝可梦 抛光水晶》的存档修改器，会通过读取游戏文件自动更新数据。',
		contact:
			'遇到坏蛋、存档损坏等问题，请到 Polished Crystal Discord 的 #save-editor 频道联系 Rev3lation。',
		disclaimer: '我不对任何存档损坏负责——请务必先备份原存档。',
		credits: '致谢：Rev3lation、Sylvie (Rangi42)、Cammy、Emi、FIQ、Darsh',
		github: 'GitHub 仓库',
		name: '名字',
		id: 'ID',
		money: '金钱',
		model: '游戏内形象',
		rival: '劲敌',
		empty: '空',
		box: '盒子',
		theme: '主题',
		changeEveryEntry: '一键修改全部图鉴：',
		unknown: '未知',
		seen: '已见',
		caught: '已捕获',
		items: '道具',
		medicine: '药品',
		balls: '精灵球',
		tmsHms: '招式学习器 / 秘传学习器',
		berries: '树果',
		keyItems: '重要物品',
		extras: '其他',
		gameCornerCoins: '游戏城代币',
		blueCardPoints: '蓝色卡片点数',
		candy: '经验糖果',
		apricorns: '球果',
		wings: '羽毛',
		nickname: '昵称',
		resetNickname: '重置昵称',
		resetNicknameHint: '重置为种族名',
		speciesForm: '物种与形态',
		heldItem: '携带道具',
		noHeldItem: '这只宝可梦没有携带道具。',
		ability: '特性',
		level: '等级',
		currentHp: '当前 HP%',
		status: '状态',
		sleepDuration: '睡眠回合',
		hatchCycles: '孵化周期',
		happiness: '亲密度',
		gender: '性别',
		male: '雄性',
		female: '雌性',
		genderless: '这只宝可梦没有性别。',
		shininess: '闪光',
		shiny: '闪光',
		notShiny: '不闪光',
		isEgg: '是否蛋',
		isEggTrue: '是蛋',
		isEggFalse: '不是蛋',
		pokerus: '宝可病毒',
		none: '无',
		cured: '已治愈',
		strain: '毒株',
		daysRemaining: '剩余天数',
		originalTrainer: '初训家',
		caughtData: '捕获信息',
		timeOfDay: '捕获时段',
		day: '白天',
		night: '夜晚',
		morning: '早晨',
		evening: '傍晚',
		ball: '精灵球',
		location: '地点',
		moves: '招式',
		powerPoints: 'PP',
		ppUps: '已用 PP 提升',
		basePower: '威力',
		accuracy: '命中',
		maxPp: '最大 PP',
		category: '分类',
		effectChance: '追加效果概率',
		physical: '物理',
		special: '特殊',
		statusMove: '变化',
		determinantValues: '个体值',
		hp: 'HP',
		atk: '攻击',
		def: '防御',
		speed: '速度',
		spAtk: '特攻',
		spDef: '特防',
		hiddenPower: '觉醒力量',
		effortValues: '努力值',
		hyperTraining: '极限特训',
		nature: '性格',
		sleep: '睡眠',
		paralysis: '麻痹',
		burn: '灼伤',
		freeze: '冰冻',
		poison: '中毒',
		deletePokemon: '删除宝可梦',
		edit: '编辑',
		heal: '治疗',
		fainted: '濒死',
		levelUpMoves: '升级招式',
		eggMoves: '蛋招式',
		evoMove: '进化招式',
		tmhmMoves: '招式学习器 / 秘传学习器',
		allMoves: '全部招式',
		search: '搜索',
		backspace: '← 退格',
		done: '完成',
		editingText: '编辑文字',
		characters: '字符',
		increased: '↑',
		decreased: '↓',
		basics: '基础',
		stats: '能力',
		caughtTab: '捕获',
		misc: '其他',
		chineseSave: '中文存档',
		chineseSaveHint: '会自动识别 2 字节中文名字。',
		unknownChars: '部分字符不在汉化码表中，会保持原样。'
	}
} as const;

export type UiKey = keyof (typeof dictionary)['en'];

class I18n {
	lang = $state<Lang>('zh');

	constructor() {
		if (browser) {
			const saved = localStorage.getItem('polished-editor-lang');
			if (saved === 'zh' || saved === 'en') this.lang = saved;
		}
	}

	set(lang: Lang): void {
		this.lang = lang;
		if (browser) localStorage.setItem('polished-editor-lang', lang);
	}

	toggle(): void {
		this.set(this.lang === 'zh' ? 'en' : 'zh');
	}
}

export const i18n = new I18n();

const zhChars = new Set(Object.values(charmapZh as Record<string, string>));

/** Whether the Chinese ROM's charmap can encode this character. */
export function isSupportedZhChar(char: string): boolean {
	return zhChars.has(char);
}

/** Fit a name into a fixed byte field, reserving one byte for the terminator. */
export function fitNameChars(name: string, maxBytes: number): string[] {
	const out: string[] = [];
	let used = 0;
	for (const char of Array.from(name)) {
		const size = isSupportedZhChar(char) ? 2 : 1;
		if (used + size > maxBytes) break;
		out.push(char);
		used += size;
	}
	return out;
}

/** Default name used by the game when a Pokémon has no nickname. */
export function defaultNickname(species: string, pf: PF, fieldBytes = 11): string[] {
	return fitNameChars(dn('pokemon', species, pf), fieldBytes - 1);
}

export function t(key: UiKey): string {
	return (dictionary[i18n.lang] as Record<string, string>)[key] ?? dictionary.en[key] ?? key;
}

function pick(entry: Entry, pf: PF): string {
	return typeof entry === 'string' ? entry : pf === 'faithful' ? entry.f : entry.p;
}

/** Localized data name. Always keep the underlying value in English for save I/O. */
export function dn(kind: NameKind, english: string, pf: PF = 'polished'): string {
	if (i18n.lang === 'en') return english;
	const entry = maps[kind]?.[english];
	return entry ? pick(entry, pf) : english;
}

/** English name, for the secondary line in Chinese mode. */
export function dnEn(kind: NameKind, english: string): string {
	return english;
}

export function isTranslated(kind: NameKind, english: string): boolean {
	return Boolean(maps[kind]?.[english]);
}

/** Localize a move category constant. */
export function categoryName(category: string): string {
	const key = category.toLowerCase();
	if (key === 'physical') return t('physical');
	if (key === 'special') return t('special');
	if (key === 'status') return t('statusMove');
	return category;
}

/** Localize a status constant used by the save parser. */
export function statusName(status: string): string {
	const map: Record<string, UiKey> = {
		None: 'none',
		Paralysis: 'paralysis',
		Burn: 'burn',
		Freeze: 'freeze',
		Poison: 'poison',
		Sleep: 'sleep'
	};
	return map[status] ? t(map[status]) : status;
}
