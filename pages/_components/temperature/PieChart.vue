<script setup lang="ts">
	import { PieChart } from 'vue-chart-3';
	import { useTemperatureStore } from '~/store/useTemperatureStore';

	const { t } = useI18n();

	const temperatureStore = useTemperatureStore();

	const data = computed(() => ({
		labels: [
			t('pages./.temperature.pie-chart.cold', 'Cold'),
			t('pages./.temperature.pie-chart.warm', 'Warm'),
			t('pages./.temperature.pie-chart.hot', 'Hot'),
		],
		datasets: [
			{
				data: [
					temperatureStore.numOfColdTemperatureMeasurements,
					temperatureStore.numOfWarmTemperatureMeasurements,
					temperatureStore.numOfHotTemperatureMeasurements,
				],
				backgroundColor: [
					'rgb(54, 162, 235)',
					'rgb(255, 205, 86)',
					'rgb(255, 99, 132)',
				],
				hoverOffset: 4,
			},
		],
	}));
</script>

<template>
	<PieChart :chart-data="data" />
</template>
