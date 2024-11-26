import type IGas from '~/interfaces/features/gas/IGas';

export const useGasStore = defineStore('gasStore', () => {
	const gas = ref<IGas[]>([]);
	const numOfDangerMeasurements = ref(0);
	const numOfModerateMeasurements = ref(0);

	const addGas = (gasRecords: IGas[]) => {
		if (!Array.isArray(gasRecords)) return;

		gas.value = gasRecords;
	};

	const clearGas = () => {
		gas.value = [];
		numOfDangerMeasurements.value = 0;
		numOfModerateMeasurements.value = 0;
	};

	const updateMeasurementCounts = (
		newNumOfModerateMeasurements: number,
		newNumOfDangerMeasurements: number,
	) => {
		if (typeof newNumOfDangerMeasurements === 'number') {
			numOfDangerMeasurements.value = newNumOfDangerMeasurements;
		}

		if (typeof newNumOfModerateMeasurements === 'number') {
			numOfModerateMeasurements.value = newNumOfModerateMeasurements;
		}
	};

	return {
		gas,
		numOfDangerMeasurements,
		numOfModerateMeasurements,
		addGas,
		clearGas,
		updateMeasurementCounts,
	};
});
