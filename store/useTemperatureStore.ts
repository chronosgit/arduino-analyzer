import type ITemperature from '~/interfaces/features/temperature/ITemperature';
import type { TTemperatureType } from '~/interfaces/features/temperature/TTemperatureType';
import type ISelectOption from '~/interfaces/ISelectOption';

export const useTemperatureStore = defineStore('temperatureStore', () => {
	const temperature = ref<ITemperature[]>([]);

	const numOfColdTemperatureMeasurements = ref(0);
	const numOfWarmTemperatureMeasurements = ref(0);
	const numOfHotTemperatureMeasurements = ref(0);

	const defaultFilterByType = constants['temperatureTypes'].map<
		ISelectOption<TTemperatureType>
	>((t) => ({ name: t, isSelected: true }));
	const defaultOffset = 0;
	const defaultLimit = 50;

	const filterByType =
		ref<ISelectOption<TTemperatureType>[]>(defaultFilterByType);
	const filterOffset = ref(defaultOffset);
	const filterLimit = ref(defaultLimit);

	const analyticsSampleSize = ref(50);

	const toggleFilterByType = (toggledFilterName: TTemperatureType) => {
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

	const updateAnalyticsSampleSize = (newSize: number) => {
		if (typeof newSize !== 'number' || Number.isNaN(newSize) || newSize <= 0) {
			return;
		}

		analyticsSampleSize.value = newSize;
	};

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

		defaultFilterByType,
		defaultLimit,
		defaultOffset,

		analyticsSampleSize,

		filterByType,
		filterLimit,
		filterOffset,

		toggleFilterByType,
		onFilterOffsetChange,
		onFilterLimitChange,

		updateAnalyticsSampleSize,

		addTemperature,
		clearTemperature,
		updatedMeasurementCounts,
	};
});
