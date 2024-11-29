<script setup lang="ts">
	import MultiSelect from '~/components/shared/MultiSelect.vue';
	import { useGasStore } from '~/store/useGasStore';
	import type IGasFilterState from '~/interfaces/features/gas/IGasFilterState';

	const { t } = useI18n();

	const emit = defineEmits<{ (e: 'on-filter-apply'): void }>();

	const gasStore = useGasStore();

	const gasFilterByTypeOptions = computed<IGasFilterState[]>(() =>
		gasStore.filterByType.map((tp) => ({
			...tp,
			label: t(`dictionary.${tp.name}`, 'Gas type'),
		})),
	);

	const onFilterChange = (e: Event) => {
		if (!e) return;

		const target = e.target as HTMLElement | null;
		if (!target) return;

		const type = target.dataset['type'] as 'type' | 'offset' | 'limit';
		if (!type || !['type', 'offset', 'limit'].includes(type)) return;

		if (type === 'type') {
			gasStore.toggleFilterByType(e);
		} else if (type === 'limit') {
			gasStore.onFilterLimitChange(e);
		} else if (type === 'offset') {
			gasStore.onFilterOffsetChange(e);
		}

		emit('on-filter-apply');
	};
</script>

<template>
	<div
		class="dark:text-white bg-zinc-300 space-y-2 dark:bg-zinc-700 py-2 px-4 rounded-sm"
	>
		<!-- Filter by gas type -->
		<MultiSelect :options="gasFilterByTypeOptions" />

		<!-- Pagination -->
		<!-- Offset -->
		<div class="flex justify-between items-center gap-1">
			<p>{{ $t('comps.features.gas.filters.offset', 'Offset:') }}:</p>

			<label for="input-offset" class="sr-only">Skip n values as offset</label>
			<input
				id="input-offset"
				data-type="offset"
				name="offset"
				:value="gasStore.filterOffset"
				type="number"
				:placeholder="gasStore.defaultOffset.toString()"
				class="px-1 text-black"
				min="0"
				@change="onFilterChange($event)"
			>
		</div>

		<!-- Limit -->
		<div class="flex justify-between items-center gap-1">
			<p>{{ $t('comps.features.gas.filters.limit', 'Limit:') }}:</p>

			<label for="input-limit" class="sr-only">Set limit</label>
			<input
				id="input-limit"
				name="limit"
				data-type="limit"
				:value="gasStore.filterLimit"
				type="number"
				:placeholder="gasStore.defaultLimit.toString()"
				class="px-1 text-black"
				min="1"
				@change="onFilterChange($event)"
			>
		</div>
	</div>
</template>
