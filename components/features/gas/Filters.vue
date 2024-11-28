<script setup lang="ts">
	import { useGasStore } from '~/store/useGasStore';

	const gasStore = useGasStore();
</script>

<template>
	<div
		class="dark:text-white bg-zinc-300 space-y-2 dark:bg-zinc-700 py-2 px-4 rounded-sm"
	>
		<!-- Filter by gas type -->
		<div class="flex justify-between items-center gap-1">
			<p>{{ $t('comps.features.gas.filters.by-type', 'By type:') }}:</p>

			<select
				class="bg-zinc-100 dark:bg-zinc-900"
				@change="gasStore.onFilterByTypeChange($event)"
			>
				<option disabled selected>
					{{ $t('comps.features.gas.filters.type-option-disabled') }}
				</option>

				<option v-for="t in constants['gasTypes']" :key="t" :value="t">
					{{ $t(`dictionary.${t}`) }}
				</option>
			</select>
		</div>

		<!-- Filter by offset -->
		<div class="flex justify-between items-center gap-1">
			<p>{{ $t('comps.features.gas.filters.offset', 'Offset:') }}:</p>

			<label for="input-offset" class="sr-only">Skip n values as offset</label>
			<input
				id="input-offset"
				:value="gasStore.filterOffset"
				type="number"
				:placeholder="gasStore.defaultOffset.toString()"
				class="px-1"
				@change="gasStore.onFilterOffsetChange($event)"
			>
		</div>

		<!-- Filter by limit -->
		<div class="flex justify-between items-center gap-1">
			<p>{{ $t('comps.features.gas.filters.limit', 'Limit:') }}:</p>

			<label for="input-limit" class="sr-only">Set limit</label>
			<input
				id="input-limit"
				:value="gasStore.filterLimit"
				type="number"
				:placeholder="gasStore.defaultLimit.toString()"
				class="px-1"
				@change="gasStore.onFilterLimitChange"
			>
		</div>
	</div>
</template>
