<script setup lang="ts">
	import TemperatureFilters from '~/components/features/temperature/Filters.vue';
	import { IconSettings } from '~/components/ui/icons';
	import TemperatureLineChart from './LineChart.vue';
	import TemperaturePieChart from './PieChart.vue';
	import { useTemperatureStore } from '~/store/useTemperatureStore';

	const temperatureStore = useTemperatureStore();

	const { fetchTemperatureFromDb } = useTemperature();
	usePeriodicFunction(fetchTemperatureFromDb, 3000);

	// Temperature filters clickaway
	const {
		val: isTemperatureFiltersVisible,
		activate: openTemperatureFiltersVisible,
		disactivate: closeTemperatureFiltersVisible,
	} = useToggle();
	useClickawayClient('filters.temperature', closeTemperatureFiltersVisible);
</script>

<template>
	<section v-if="temperatureStore.temperature.length" class="space-y-10">
		<div class="relative flex justify-between items-center gap-1">
			<h2 class="text-center font-bold text-2xl dark:text-white">
				{{ $t('pages./.temperature.title') }}
			</h2>

			<ClientOnly>
				<IconSettings
					class="hover:text-indigo-500 transition-colors scale-125 cursor-pointer dark:text-white"
					@click="openTemperatureFiltersVisible"
				/>

				<TemperatureFilters
					v-if="isTemperatureFiltersVisible"
					ref="filters.temperature"
					class="shadow-md z-50 absolute right-0 top-0 translate-y-8"
					@on-filter-apply="fetchTemperatureFromDb"
				/>
			</ClientOnly>
		</div>

		<TemperatureLineChart />

		<TemperaturePieChart />
	</section>

	<div v-else class="relative flex gap-1 items-center justify-between">
		<p class="font-bold dark:text-white text-lg text-center">
			{{ $t('pages./.temperature.no-data') }}
		</p>

		<ClientOnly>
			<IconSettings
				class="hover:text-indigo-400 transition-colors scale-125 cursor-pointer dark:text-white"
				@click="openTemperatureFiltersVisible"
			/>

			<TemperatureFilters
				v-if="isTemperatureFiltersVisible"
				ref="filters.temperature"
				class="shadow-md z-50 absolute right-0 top-0 translate-y-8"
				@on-filter-apply="fetchTemperatureFromDb"
			/>
		</ClientOnly>
	</div>
</template>
