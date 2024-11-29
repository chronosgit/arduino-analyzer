<script setup lang="ts">
	import MultiSelect from '~/components/shared/MultiSelect.vue';
	import { useTemperatureStore } from '~/store/useTemperatureStore';
	import type ISelectOption from '~/interfaces/ISelectOption';
	import type { TTemperatureType } from '~/interfaces/features/temperature/TTemperatureType';

	const { t } = useI18n();

	const temperatureStore = useTemperatureStore();

	const temperatureFilterByTypeOptions = computed<
		ISelectOption<TTemperatureType>[]
	>(() =>
		temperatureStore.filterByType.map((tp) => ({
			...tp,
			label: t(`dictionary.${tp.name}`, 'Gas type'),
		})),
	);

	const onFilterSelect = (selectedFilter: string) => {
		if (
			!constants['temperatureTypes'].includes(
				selectedFilter as TTemperatureType,
			)
		)
			return;

		temperatureStore.toggleFilterByType(selectedFilter as TTemperatureType);
	};
</script>

<template>
	<MultiSelect
		:options="temperatureFilterByTypeOptions"
		@on-select="onFilterSelect"
	/>
</template>
