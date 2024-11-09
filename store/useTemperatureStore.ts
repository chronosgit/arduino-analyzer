export const useTemperatureStore = defineStore('TemperatureStore', () => {
	const temperature = ref<number[]>([]);

	const numOfColdTemperatureMeasurements = ref(0);
	const numOfWarmTemperatureMeasurements = ref(0);
	const numOfHotTemperatureMeasurements = ref(0);

	const maxColdTemperature = 0;
	const maxWarmTemperature = 25;

	const addTemperatureMeasurement = (temp: number) => {
		if (typeof temp !== 'number' || Number.isNaN(temp)) return;

		if (temp <= maxColdTemperature) {
			numOfColdTemperatureMeasurements.value++;
		} else if (temp <= maxWarmTemperature) {
			numOfWarmTemperatureMeasurements.value++;
		} else {
			numOfHotTemperatureMeasurements.value++;
		}

		temperature.value.push(temp);
	};

	const clearTemperatureValue = () => {
		temperature.value = [];
	};

	return {
		temperature,
		maxColdTemperature,
		maxWarmTemperature,
		numOfColdTemperatureMeasurements,
		numOfWarmTemperatureMeasurements,
		numOfHotTemperatureMeasurements,
		addTemperatureMeasurement,
		clearTemperatureValue,
	};
});
