import type { TGasType } from '~/server/interfaces/features/gas/TGasType';
import type { ObjectId } from 'mongoose';

export default interface IGas {
	_id: ObjectId;
	type: TGasType;
	value: number;
	timestamp: Date;
}
