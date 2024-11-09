<script setup lang="ts">
	import ArduinoStateHeading from './_components/ArduinoStateHeading.vue';
	import GasLineChart from './_components/gas/LineChart.vue';
	import GasPieChart from './_components/gas/PieChart.vue';
	import TemperatureLineChart from './_components/temperature/LineChart.vue';
	import TemperaturePieChart from './_components/temperature/PieChart.vue';
	import { useGasStore } from '~/store/useGasStore';
	import { useTemperatureStore } from '~/store/useTemperatureStore';

	const gasStore = useGasStore();
	const temperatureStore = useTemperatureStore();

	const { isArduinoAlive } = useArduino();

	useGas();
	useTemperature();

	provide('isArduinoAlive', isArduinoAlive);
</script>

<template>
	<div class="px-2 pt-8 min-h-screen dark:bg-zinc-900">
		<div class="container pb-12 mx-auto space-y-32">
			<ArduinoStateHeading />

			<!-- Gas density section -->
			<section v-if="gasStore.gas.length" class="space-y-10">
				<h2 class="text-center font-bold text-2xl dark:text-white">
					{{ $t('pages./.gas.title') }}
				</h2>

				<GasLineChart />

				<GasPieChart />
			</section>
			<p v-else class="font-bold dark:text-white text-lg text-center">
				{{ $t('pages./.gas.no-data') }}
			</p>

			<!-- Temperature in °C section -->
			<section v-if="temperatureStore.temperature.length" class="space-y-10">
				<h2 class="text-center font-bold text-2xl dark:text-white">
					{{ $t('pages./.temperature.title') }}
				</h2>

				<TemperatureLineChart />

				<TemperaturePieChart />
			</section>
			<p v-else class="font-bold dark:text-white text-lg text-center">
				{{ $t('pages./.temperature.no-data') }}
			</p>
		</div>
	</div>
</template>
