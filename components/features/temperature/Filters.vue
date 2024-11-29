<script setup lang="ts">
	import { useTemperatureStore } from '~/store/useTemperatureStore';
	import FilterByTypeMultiSelect from '~/components/features/temperature/FilterByTypeMultiSelect.vue';

	const temperatureStore = useTemperatureStore();

	const emit = defineEmits<{ (e: 'on-filter-apply'): void }>();

	const onFilterChange = (e: Event) => {
		const target = getEventTarget(e, 'target');

		const type = target.dataset['type'] as 'offset' | 'limit';
		if (!type || !['offset', 'limit'].includes(type)) return;

		switch (type) {
			case 'limit':
				temperatureStore.onFilterLimitChange(e);

				emit('on-filter-apply');
				break;
			case 'offset':
				temperatureStore.onFilterOffsetChange(e);

				emit('on-filter-apply');
				break;
			default:
				break;
		}
	};
</script>

<template>
	<div
		class="dark:text-white bg-zinc-300 space-y-2 dark:bg-zinc-700 py-2 px-4 rounded-sm"
	>
		<!-- Filter by temperature type -->
		<FilterByTypeMultiSelect />

		<!-- Pagination -->
		<!-- Offset -->
		<div class="flex justify-between items-center gap-1">
			<p>{{ $t('comps.features.gas.filters.offset', 'Offset:') }}:</p>

			<label for="input-offset" class="sr-only">Skip n values as offset</label>
			<!-- eslint-disable-next-line vue/html-self-closing -->
			<input
				id="input-offset"
				data-type="offset"
				name="offset"
				:value="temperatureStore.filterOffset"
				type="number"
				:placeholder="temperatureStore.defaultOffset.toString()"
				class="px-1 text-black"
				min="0"
				@change="onFilterChange($event)"
			/>
		</div>

		<!-- Limit -->
		<div class="flex justify-between items-center gap-1">
			<p>{{ $t('comps.features.gas.filters.limit', 'Limit:') }}:</p>

			<label for="input-limit" class="sr-only">Set limit</label>
			<!-- eslint-disable-next-line vue/html-self-closing -->
			<input
				id="input-limit"
				name="limit"
				data-type="limit"
				:value="temperatureStore.filterLimit"
				type="number"
				:placeholder="temperatureStore.defaultLimit.toString()"
				class="px-1 text-black"
				min="1"
				@change="onFilterChange($event)"
			/>
		</div>
	</div>
</template>
