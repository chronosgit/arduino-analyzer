<script setup lang="ts">
	import { LineChart } from 'vue-chart-3';
	import { useTemperatureStore } from '~/store/useTemperatureStore';

	const temperatureStore = useTemperatureStore();

	const data = computed(() => ({
		labels: temperatureStore.temperature.map((_, i) => i + 1),
		datasets: [
			{
				label: 'Temperature °C',
				data: temperatureStore.temperature,
				tension: 0.1,
				borderColor: 'rgb(200, 224, 208)',

				pointBackgroundColor: temperatureStore.temperature.map((t) => {
					if (t <= temperatureStore.maxColdTemperature) {
						return 'blue';
					} else if (t <= temperatureStore.maxWarmTemperature) {
						return 'orange';
					}
					return 'red';
				}),
			},
		],
	}));
</script>

<template>
	<div>
		<LineChart :chart-data="data" />
	</div>
</template>
