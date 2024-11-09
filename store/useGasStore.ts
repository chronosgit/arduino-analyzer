export const useGasStore = defineStore('gasStore', () => {
	const gas = ref<number[]>([]);
	const numOfDangerMeasurements = ref(0);
	const numOfModerateMeasurements = ref(0);

	const dangerGasThreshold = 600;

	const addGasMeasurement = (gasMeasurement: number) => {
		if (typeof gasMeasurement !== 'number' || Number.isNaN(gasMeasurement)) {
			return;
		}

		if (gasMeasurement > dangerGasThreshold) numOfDangerMeasurements.value++;
		else numOfModerateMeasurements.value++;

		gas.value.push(gasMeasurement);
	};

	const clearGasValue = () => {
		gas.value = [];
		numOfDangerMeasurements.value = 0;
	};

	return {
		gas,
		numOfDangerMeasurements,
		numOfModerateMeasurements,
		dangerGasThreshold,
		addGasMeasurement,
		clearGasValue,
	};
});
