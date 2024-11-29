<script setup lang="ts">
	import TemperatureFilters from '~/components/features/temperature/Filters.vue';
	import TemperatureLineChart from './LineChart.vue';
	import TemperaturePieChart from './PieChart.vue';
	import DataOptions from '../DataOptions.vue';
	import { useTemperatureStore } from '~/store/useTemperatureStore';

	const temperatureStore = useTemperatureStore();

	const { fetchTemperatureFromDb } = useTemperature();

	// Turn on/off periodic fetch of temperature
	const isTemperatureFetchFromDbOn = ref(true);
	usePeriodicFunction(() => {
		if (!isTemperatureFetchFromDbOn.value) return;

		fetchTemperatureFromDb();
	}, 3000);

	const sectionRef = useTemplateRef<HTMLElement>('section');
	const graphTemplateRefs = computed(() => [sectionRef]);
</script>

<template>
	<section
		v-if="temperatureStore.temperature.length"
		ref="section"
		class="space-y-10"
	>
		<div class="relative flex justify-between items-center gap-1">
			<h2 class="text-center font-bold text-2xl dark:text-white">
				{{ $t('pages./.temperature.title') }}
			</h2>

			<DataOptions
				:saveable-element-template-refs="graphTemplateRefs"
				:is-fetching-from-db-on="isTemperatureFetchFromDbOn"
				@pause="() => (isTemperatureFetchFromDbOn = false)"
				@resume="() => (isTemperatureFetchFromDbOn = true)"
			>
				<template #filters>
					<TemperatureFilters @on-filter-apply="fetchTemperatureFromDb" />
				</template>
			</DataOptions>
		</div>

		<TemperatureLineChart />

		<TemperaturePieChart />
	</section>

	<div v-else class="relative flex gap-1 items-center justify-between">
		<p class="font-bold dark:text-white text-lg text-center">
			{{ $t('pages./.temperature.no-data') }}
		</p>

		<DataOptions
			:saveable-element-template-refs="graphTemplateRefs"
			:is-fetching-from-db-on="isTemperatureFetchFromDbOn"
			@pause="() => (isTemperatureFetchFromDbOn = false)"
			@resume="() => (isTemperatureFetchFromDbOn = true)"
		>
			<template #filters>
				<TemperatureFilters @on-filter-apply="fetchTemperatureFromDb" />
			</template>
		</DataOptions>
	</div>
</template>
