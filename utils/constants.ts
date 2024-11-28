import type { TGasType } from '~/interfaces/features/gas/TGasType';

export default {
	moderateGasThreshhold: 600,
	maxColdTemperatureInCelcius: 0,
	maxWarmTemperatureInCelcius: 25,
	gasTypes: <TGasType[]>[
		'methane',
		'hydrogen',
		'smoke',
		'butane',
		'ethanol',
		'co',
		'lpg',
	],
};
