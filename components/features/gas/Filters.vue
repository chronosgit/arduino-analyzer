<script setup lang="ts">
	import FilterByTypeMultiSelect from '~/components/features/gas/FilterByTypeMultiSelect.vue';
	import { useGasStore } from '~/store/useGasStore';

	const emit = defineEmits<{ (e: 'on-filter-apply'): void }>();

	const gasStore = useGasStore();

	const onFilterChange = (e: Event) => {
		const target = getEventTarget(e, 'target');

		const type = target.dataset['type'] as 'offset' | 'limit';
		if (!type || !['offset', 'limit'].includes(type)) return;

		switch (type) {
			case 'limit':
				gasStore.onFilterLimitChange(e);

				emit('on-filter-apply');
				break;
			case 'offset':
				gasStore.onFilterOffsetChange(e);

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
		<!-- Filter by gas type -->
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
				:value="gasStore.filterOffset"
				type="number"
				:placeholder="gasStore.defaultOffset.toString()"
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
				:value="gasStore.filterLimit"
				type="number"
				:placeholder="gasStore.defaultLimit.toString()"
				class="px-1 text-black"
				min="1"
				@change="onFilterChange($event)"
			/>
		</div>
	</div>
</template>
