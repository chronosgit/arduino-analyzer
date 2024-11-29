<script setup lang="ts">
	import GasFilters from '~/components/features/gas/Filters.vue';
	import { IconSettings } from '~/components/ui/icons';
	import GasLineChart from './LineChart.vue';
	import GasPieChart from './PieChart.vue';
	import { useGasStore } from '~/store/useGasStore';

	const gasStore = useGasStore();

	const { fetchGasFromDb } = useGas();

	const {
		val: isGasFiltersVisible,
		activate: openGasFilters,
		disactivate: closeGasFilters,
	} = useToggle();
	useClickawayClient('filters.gas', closeGasFilters);
</script>

<template>
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
</template>
