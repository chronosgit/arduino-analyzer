import type IGas from '~/interfaces/features/gas/IGas';
import type IGasGroupedByType from '~/interfaces/features/gas/IGasGroupedByType';
import type { TGasType } from '~/interfaces/features/gas/TGasType';
import type ISelectOption from '~/interfaces/ISelectOption';

export const useGasStore = defineStore('gasStore', () => {
	const gas = ref<IGas[]>([]);
	const numOfDangerMeasurements = ref(0);
	const numOfModerateMeasurements = ref(0);

	const gasPredictions = ref<IGasGroupedByType[]>([]);

	const defaultFilterByType = constants['gasTypes'].map<
		ISelectOption<TGasType>
	>((t) => ({ name: t, isSelected: true }));
	const defaultOffset = 0;
	const defaultLimit = 50;

	const filterByType = ref<ISelectOption<TGasType>[]>(defaultFilterByType);
	const filterOffset = ref(defaultOffset);
	const filterLimit = ref(defaultLimit);

	const updateGasPredictions = (newGasArrayByType: IGasGroupedByType[]) => {
		if (!Array.isArray(newGasArrayByType)) return;

		gasPredictions.value = newGasArrayByType;
	};

	const toggleFilterByType = (toggledFilterName: TGasType) => {
		const toggledFilter = filterByType.value.find(
			(f) => f.name === toggledFilterName,
		);
		if (toggledFilter == null) return;

		toggledFilter.isSelected = !toggledFilter.isSelected;
	};

	const onFilterOffsetChange = (e: Event) => {
		const target = getEventTarget(e, 'target');
		const newOffset = parseInt(getEventTargetValue(target));

		if (Number.isNaN(newOffset) || newOffset < 0) return;

		filterOffset.value = newOffset;
	};

	const onFilterLimitChange = (e: Event) => {
		const target = getEventTarget(e, 'target');
		const newLimit = parseInt(getEventTargetValue(target));

		if (Number.isNaN(newLimit) || newLimit < 0) return;

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

		gasPredictions,

		defaultFilterByType,
		defaultOffset,
		defaultLimit,

		filterByType,
		filterOffset,
		filterLimit,

		updateGasPredictions,

		toggleFilterByType,
		onFilterOffsetChange,
		onFilterLimitChange,

		addGas,
		clearGas,
		updateMeasurementCounts,
	};
});
