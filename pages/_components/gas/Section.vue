<script setup lang="ts">
	import GasFilters from '~/components/features/gas/Filters.vue';
	import GasLineChart from './LineChart.vue';
	import GasPieChart from './PieChart.vue';
	import DataOptions from '../DataOptions.vue';
	import { useGasStore } from '~/store/useGasStore';

	const gasStore = useGasStore();

	const { fetchGasFromDb } = useGas();

	// Turn on/off periodic fetch of gas
	const isGasFetchFromDbOn = ref(true);
	usePeriodicFunction(() => {
		if (!isGasFetchFromDbOn.value) return;

		fetchGasFromDb();
	}, 3000);

	const sectionRef = useTemplateRef<HTMLElement>('section');
	const graphTemplateRefs = computed(() => [sectionRef]);
</script>

<template>
	<section v-if="gasStore.gas.length" ref="section" class="space-y-10">
		<div class="relative flex justify-between items-center gap-1">
			<h2 class="text-center font-bold text-2xl dark:text-white">
				{{ $t('pages./.gas.title') }}
			</h2>

			<DataOptions
				:saveable-element-template-refs="graphTemplateRefs"
				:is-fetching-from-db-on="isGasFetchFromDbOn"
				@pause="() => (isGasFetchFromDbOn = false)"
				@resume="() => (isGasFetchFromDbOn = true)"
			>
				<template #filters>
					<GasFilters @on-filter-apply="fetchGasFromDb" />
				</template>
			</DataOptions>
		</div>

		<GasLineChart />

		<GasPieChart />
	</section>

	<div v-else class="relative flex gap-1 items-center justify-between">
		<p class="font-bold dark:text-white text-lg text-center">
			{{ $t('pages./.gas.no-data') }}
		</p>

		<DataOptions
			:saveable-element-template-refs="graphTemplateRefs"
			:is-fetching-from-db-on="isGasFetchFromDbOn"
			@pause="() => (isGasFetchFromDbOn = false)"
			@resume="() => (isGasFetchFromDbOn = true)"
		>
			<template #filters>
				<GasFilters @on-filter-apply="fetchGasFromDb" />
			</template>
		</DataOptions>
	</div>
</template>
