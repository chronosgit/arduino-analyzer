import type { TypeGas } from '~/server/interfaces/features/gas/TypeGas';
import type { ObjectId } from 'mongoose';

export default interface IGas {
	_id: ObjectId;
	type: TypeGas;
	value: number;
	timestamp: Date;
}
