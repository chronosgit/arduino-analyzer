import type IGas from '~/interfaces/features/gas/IGas';
import type { TGasType } from '~/interfaces/features/gas/TGasType';

export const useGasStore = defineStore('gasStore', () => {
	const gas = ref<IGas[]>([]);
	const numOfDangerMeasurements = ref(0);
	const numOfModerateMeasurements = ref(0);

	const defaultFilterByType = null;
	const defaultOffset = 0;
	const defaultLimit = 50;
	const filterByType = ref<TGasType | null>(defaultFilterByType);
	const filterOffset = ref(defaultOffset);
	const filterLimit = ref(defaultLimit);

	const onFilterByTypeChange = (e: Event) => {
		if (!e) return;

		const input = e.target as HTMLSelectElement | null;
		if (!input || input.value == null) return;

		const newType = input.value;
		if (!newType) return;

		if (!constants['gasTypes'].includes(newType)) return;

		filterByType.value = newType as TGasType;
	};

	const onFilterOffsetChange = (e: Event) => {
		if (!e) return;

		const input = e.target as HTMLInputElement | null;
		if (!input || input.value == null) return;

		const newOffset = parseInt(input.value);

		if (
			Number.isNaN(newOffset) ||
			typeof newOffset !== 'number' ||
			newOffset < 0
		)
			return;

		filterOffset.value = newOffset;
	};

	const onFilterLimitChange = (e: Event) => {
		if (!e) return;

		const input = e.target as HTMLInputElement | null;
		if (!input || input.value == null) return;

		const newLimit = parseInt(input.value);

		if (Number.isNaN(newLimit) || typeof newLimit !== 'number' || newLimit < 0)
			return;

		filterLimit.value = newLimit;
	};

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
		defaultFilterByType,
		defaultOffset,
		defaultLimit,
		filterByType,
		filterOffset,
		filterLimit,
		onFilterByTypeChange,
		onFilterOffsetChange,
		onFilterLimitChange,
		addGas,
		clearGas,
		updateMeasurementCounts,
	};
});
