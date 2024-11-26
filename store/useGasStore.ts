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

		if (gasVal > moderateGasThreshold) numOfDangerMeasurements.value++;
		else numOfModerateMeasurements.value++;

		gas.value.push(gasRecord);
	};

	const clearGas = () => {
		gas.value = [];
		numOfDangerMeasurements.value = 0;
		numOfModerateMeasurements.value = 0;
	};

	return {
		gas,
		numOfDangerMeasurements,
		numOfModerateMeasurements,
		moderateGasThreshold,
		completelyReAddGas,
		addGas,
		clearGas,
	};
});
