import type IGas from '~/interfaces/features/gas/IGas';
import type IGasFilterState from '~/interfaces/features/gas/IGasFilterState';
import type { TGasType } from '~/interfaces/features/gas/TGasType';

export const useGasStore = defineStore('gasStore', () => {
	const gas = ref<IGas[]>([]);
	const numOfDangerMeasurements = ref(0);
	const numOfModerateMeasurements = ref(0);

	const defaultFilterByType = constants['gasTypes'].map<IGasFilterState>(
		(t) => ({ name: t, isSelected: true }),
	);
	const defaultOffset = 0;
	const defaultLimit = 50;

	const filterByType = ref<IGasFilterState[]>(defaultFilterByType);
	const filterOffset = ref(defaultOffset);
	const filterLimit = ref(defaultLimit);

	const toggleFilterByType = (e: Event) => {
		if (!e) return;

		const target = e.currentTarget as HTMLElement | null;
		if (!target) return;

		const gasType = target.dataset['type'];
		if (
			gasType == null ||
			!constants['gasTypes'].includes(gasType as TGasType)
		) {
			return;
		}

		const toggledFilter = filterByType.value.find((f) => f.name === gasType);
		if (toggledFilter == null) return;

		toggledFilter.isSelected = !toggledFilter.isSelected;
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
		toggleFilterByType,
		onFilterOffsetChange,
		onFilterLimitChange,
		addGas,
		clearGas,
		updateMeasurementCounts,
	};
});
