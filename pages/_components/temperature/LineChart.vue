<script setup lang="ts">
	import { LineChart } from 'vue-chart-3';
	import { useTemperatureStore } from '~/store/useTemperatureStore';

	const { t } = useI18n();

	const temperatureStore = useTemperatureStore();

	const temperatureValues = computed(() =>
		temperatureStore.temperature.map((te) => te.value),
	);

	const data = computed(() => ({
		labels: temperatureValues.value.map((_, i) => i + 1),
		datasets: [
			{
				label: t('pages./.temperature.line-chart', 'Temperature in °C'),
				data: temperatureValues.value,
				tension: 0.1,
				borderColor: 'rgb(200, 224, 208)',
				pointBackgroundColor: temperatureValues.value.map((t) => {
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
