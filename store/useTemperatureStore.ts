import type ITemperature from '~/interfaces/features/temperature/ITemperature';

export const useTemperatureStore = defineStore('temperatureStore', () => {
	const temperature = ref<ITemperature[]>([]);

	const numOfColdTemperatureMeasurements = ref(0);
	const numOfWarmTemperatureMeasurements = ref(0);
	const numOfHotTemperatureMeasurements = ref(0);

	const addTemperature = (temp: ITemperature[]) => {
		if (!Array.isArray(temp)) return;

		temperature.value = temp;
	};

	const clearTemperature = () => {
		temperature.value = [];
		numOfColdTemperatureMeasurements.value = 0;
		numOfHotTemperatureMeasurements.value = 0;
		numOfWarmTemperatureMeasurements.value = 0;
	};

	const updatedMeasurementCounts = (
		newNumOfColdTempMeasurements: number,
		newNumOfWarmTempMeasurements: number,
		newNumOfHotTempMeasurements: number,
	) => {
		if (typeof newNumOfColdTempMeasurements === 'number') {
			numOfColdTemperatureMeasurements.value = newNumOfColdTempMeasurements;
		}

		if (typeof newNumOfWarmTempMeasurements === 'number') {
			numOfWarmTemperatureMeasurements.value = newNumOfWarmTempMeasurements;
		}

		if (typeof newNumOfHotTempMeasurements === 'number') {
			numOfHotTemperatureMeasurements.value = newNumOfHotTempMeasurements;
		}
	};

	return {
		temperature,
		numOfColdTemperatureMeasurements,
		numOfWarmTemperatureMeasurements,
		numOfHotTemperatureMeasurements,
		addTemperature,
		clearTemperature,
		updatedMeasurementCounts,
	};
});
