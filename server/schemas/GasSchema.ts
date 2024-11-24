import { Schema } from 'mongoose';
import type IGas from '~/server/interfaces/features/gas/IGas';
import type { TypeGas } from '~/server/interfaces/features/gas/TypeGas';

const GasTypes = <TypeGas[]>[
	'methane',
	'hydrogen',
	'smoke',
	'butane',
	'ethanol',
	'co',
	'lpg',
];

export default new Schema<IGas>({
	type: {
		type: String,
		required: true,
		enum: GasTypes,
	},
	value: { type: Number, required: true },
	timestamp: { type: Date, required: true },
});
