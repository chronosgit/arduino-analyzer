import type { ObjectId } from 'mongoose';
import type { TTemperatureType } from './TTemperatureType';

export default interface ITemperature {
	_id: ObjectId;
	type: TTemperatureType;
	value: number;
	timestamp: Date;
}
