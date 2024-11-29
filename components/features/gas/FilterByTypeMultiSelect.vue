<script setup lang="ts">
	import MultiSelect from '~/components/shared/MultiSelect.vue';
	import { useGasStore } from '~/store/useGasStore';
	import type { TGasType } from '~/interfaces/features/gas/TGasType';
	import type ISelectOption from '~/interfaces/ISelectOption';

	const { t } = useI18n();

	const gasStore = useGasStore();

	const gasFilterByTypeOptions = computed<ISelectOption<TGasType>[]>(() =>
		gasStore.filterByType.map((tp) => ({
			...tp,
			label: t(`dictionary.${tp.name}`, 'Gas type'),
		})),
	);

	const onFilterSelect = (selectedFilter: string) => {
		if (!constants['gasTypes'].includes(selectedFilter as TGasType)) return;

		gasStore.toggleFilterByType(selectedFilter as TGasType);
	};
</script>

<template>
	<MultiSelect :options="gasFilterByTypeOptions" @on-select="onFilterSelect" />
</template>
