import type { ObjectId } from 'mongoose';
import type { TGasType } from '~/server/interfaces/features/gas/TGasType';

export default interface IGas {
	_id: ObjectId;
	type: TGasType;
	value: number;
	timestamp: Date;
}
