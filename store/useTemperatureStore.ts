import type ITemperature from '~/interfaces/features/temperature/ITemperature';

export const useTemperatureStore = defineStore('temperatureStore', () => {
	const temperature = ref<ITemperature[]>([]);

	const numOfColdTemperatureMeasurements = ref(0);
	const numOfWarmTemperatureMeasurements = ref(0);
	const numOfHotTemperatureMeasurements = ref(0);

	const maxColdTemperature = 0;
	const maxWarmTemperature = 25;

	const completelyReAddTemperature = (temp: ITemperature[]) => {
		if (!Array.isArray(temp)) return;

		temperature.value = temp;
	};

	const addTemperature = (temp: ITemperature) => {
		const tempVal = temp.value;

		if (typeof tempVal !== 'number' || Number.isNaN(tempVal)) return;

		if (tempVal <= maxColdTemperature) {
			numOfColdTemperatureMeasurements.value++;
		} else if (tempVal <= maxWarmTemperature) {
			numOfWarmTemperatureMeasurements.value++;
		} else {
			numOfHotTemperatureMeasurements.value++;
		}

		temperature.value.push(temp);
	};

	const clearTemperature = () => {
		temperature.value = [];
		numOfColdTemperatureMeasurements.value = 0;
		numOfHotTemperatureMeasurements.value = 0;
		numOfWarmTemperatureMeasurements.value = 0;
	};

	return {
		temperature,
		maxColdTemperature,
		maxWarmTemperature,
		numOfColdTemperatureMeasurements,
		numOfWarmTemperatureMeasurements,
		numOfHotTemperatureMeasurements,
		completelyReAddTemperature,
		addTemperature,
		clearTemperature,
	};
});
