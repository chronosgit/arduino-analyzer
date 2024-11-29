import type { TGasType } from '~/interfaces/features/gas/TGasType';
import type { TTemperatureType } from '~/interfaces/features/temperature/TTemperatureType';

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
	temperatureTypes: <TTemperatureType[]>['celcius', 'fahrenheit'],
};
