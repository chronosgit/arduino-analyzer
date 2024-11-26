import type { TTemperatureType } from '~/server/interfaces/features/temperature/TTemperatureType';

export default interface ITemperature {
	_id: string;
	type: TTemperatureType;
	value: number;
	timestamp: Date;
}
