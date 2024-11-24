import { Schema } from 'mongoose';
import type ITemperature from '~/server/interfaces/features/temperature/ITemperature';
import type { TTemperatureType } from '~/server/interfaces/features/temperature/TTemperatureType';

const TemperatureTypes = <TTemperatureType[]>['celcius', 'fahrenheit'];

export default new Schema<ITemperature>({
	type: {
		type: String,
		required: true,
		enum: TemperatureTypes,
	},
	value: { type: Number, required: true },
	timestamp: { type: Date, required: true },
});
