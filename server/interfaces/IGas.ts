import type { TypeGas } from '~/server/interfaces/TypeGas';
import type { ObjectId } from 'mongoose';

export default interface IGas {
	_id: ObjectId;
	type: TypeGas;
	value: number;
	timestamp: Date;
}
