import type IGas from '~/interfaces/features/gas/IGas';

export const useGasStore = defineStore('gasStore', () => {
	const gas = ref<IGas[]>([]);
	const numOfDangerMeasurements = ref(0);
	const numOfModerateMeasurements = ref(0);

	const moderateGasThreshold = 600;

	const completelyReAddGas = (gasRecords: IGas[]) => {
		if (!Array.isArray(gasRecords)) return;

		gas.value = gasRecords;
	};

	const addGas = (gasRecord: IGas) => {
		const gasVal = gasRecord.value;

		if (typeof gasVal !== 'number' || Number.isNaN(gasVal)) return;

		gas.value.push(gasRecord);
	};

	const clearGas = () => {
		gas.value = [];
		numOfDangerMeasurements.value = 0;
		numOfModerateMeasurements.value = 0;
	};

	const updatedMeasurementCounts = (
		newNumOfModerateMeasurements: number,
		newNumOfDangerMeasurements: number,
	) => {
		if (
			typeof newNumOfDangerMeasurements !== 'number' ||
			typeof newNumOfModerateMeasurements !== 'number'
		) {
			return;
		}

		numOfDangerMeasurements.value = newNumOfDangerMeasurements;
		numOfModerateMeasurements.value = newNumOfModerateMeasurements;
	};

	return {
		gas,
		numOfDangerMeasurements,
		numOfModerateMeasurements,
		moderateGasThreshold,
		completelyReAddGas,
		addGas,
		clearGas,
		updatedMeasurementCounts,
	};
});
