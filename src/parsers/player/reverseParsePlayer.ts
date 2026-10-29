import addresses from '$data/addresses.json';
import type { Player } from '$parsers/types';
import { writeString, insert } from '$parsers/utils';

function reverseParsePlayer(file: Uint8Array, player: Player): Uint8Array {
	file = insert(file, addresses.wPlayerID, 2, player.id);
	file = writeString(file, addresses.wPlayerName, 11, player.name, false, 0x00);
	file = writeString(file, addresses.wRivalName, 11, player.rivalName, false, 0x00);
	file = insert(file, addresses.wMoney, 3, player.money);
	file[addresses.wPlayerGender] = ['Male', 'Female', 'Non-Binary'].findIndex(
		(g) => g === player.gender
	);
	return file;
}

export default reverseParsePlayer;
