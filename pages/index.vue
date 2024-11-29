<script setup lang="ts">
	import { IconSettings } from '~/components/ui/icons';
	import GasFilters from '~/components/features/gas/Filters.vue';
	import TemperatureFilters from '~/components/features/temperature/Filters.vue';
	import EspStateHeading from './_components/EspStateHeading.vue';
	import DbStateHeading from './_components/DbStateHeading.vue';
	import GasLineChart from './_components/gas/LineChart.vue';
	import GasPieChart from './_components/gas/PieChart.vue';
	import TemperatureLineChart from './_components/temperature/LineChart.vue';
	import TemperaturePieChart from './_components/temperature/PieChart.vue';
	import { useGasStore } from '~/store/useGasStore';
	import { useTemperatureStore } from '~/store/useTemperatureStore';

	const { t } = useI18n();

	const gasStore = useGasStore();
	const temperatureStore = useTemperatureStore();

	useHead({ title: t('pages./.meta.title') });

	const { isEspAlive } = useEsp();
	useEspGas();
	useEspTemperature();

	const { fetchGasFromDb } = useGas();

	const { fetchTemperatureFromDb } = useTemperature();
	usePeriodicFunction(fetchTemperatureFromDb, 3000);

	// Checking DB connection state
	const { isDbConnected, fetchDbConnectionStatus } = useDb();
	usePeriodicFunction(fetchDbConnectionStatus);

	// Gas filters clickaway
	const {
		val: isGasFiltersVisible,
		activate: openGasFilters,
		disactivate: closeGasFilters,
	} = useToggle();
	useClickawayClient('filters.gas', closeGasFilters);

	// Temperature filters clickaway
	const {
		val: isTemperatureFiltersVisible,
		activate: openTemperatureFiltersVisible,
		disactivate: closeTemperatureFiltersVisible,
	} = useToggle();
	useClickawayClient('filters.temperature', closeTemperatureFiltersVisible);

	provide('isEspAlive', isEspAlive);
	provide('isDbConnected', isDbConnected);
</script>

<template>
	<div
		class="px-2 pt-8 min-h-screen dark:bg-zinc-900"
		:class="{
			'pb-36':
				isTemperatureFiltersVisible && !temperatureStore.temperature.length,
		}"
	>
		<div class="container pb-12 mx-auto space-y-20">
			<div class="space-y-2">
				<EspStateHeading />

				<DbStateHeading />
			</div>

			<!-- Gas density section -->
			<section v-if="gasStore.gas.length" class="space-y-10">
				<div class="relative flex justify-between items-center gap-1">
					<h2 class="text-center font-bold text-2xl dark:text-white">
						{{ $t('pages./.gas.title') }}
					</h2>

					<ClientOnly>
						<IconSettings
							class="hover:text-indigo-500 transition-colors scale-125 cursor-pointer dark:text-white"
							@click="openGasFilters"
						/>

						<GasFilters
							v-if="isGasFiltersVisible"
							ref="filters.gas"
							class="shadow-md z-50 absolute right-0 top-0 translate-y-8"
							@on-filter-apply="fetchGasFromDb"
						/>
					</ClientOnly>
				</div>

				<GasLineChart />

				<GasPieChart />
			</section>

			<div v-else class="relative flex gap-1 items-center justify-between">
				<p class="font-bold dark:text-white text-lg text-center">
					{{ $t('pages./.gas.no-data') }}
				</p>

				<ClientOnly>
					<IconSettings
						class="hover:text-indigo-400 transition-colors scale-125 cursor-pointer dark:text-white"
						@click="openGasFilters"
					/>

					<GasFilters
						v-if="isGasFiltersVisible"
						ref="filters.gas"
						class="shadow-md z-50 absolute right-0 top-0 translate-y-8"
						@on-filter-apply="fetchGasFromDb"
					/>
				</ClientOnly>
			</div>

			<!-- Temperature in °C section -->
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
						@on-filter-apply="fetchGasFromDb"
					/>
				</ClientOnly>
			</div>
		</div>
	</div>
</template>
