<script setup lang="ts">
	import { PieChart } from 'vue-chart-3';
	import { useGasStore } from '~/store/useGasStore';

	const { t } = useI18n();

	const gasStore = useGasStore();

	const data = computed(() => ({
		labels: [
			t('pages./.gas.pie-chart.danger', 'Danger'),
			t('pages./.gas.pie-chart.moderate', 'Moderate'),
		],
		datasets: [
			{
				data: [
					gasStore.numOfDangerMeasurements,
					gasStore.numOfModerateMeasurements,
				],
				backgroundColor: ['rgb(227, 54, 28)', 'rgb(71, 186, 62)'],
				hoverOffset: 4,
			},
		],
	}));

	const isDataExist = computed(
		() =>
			gasStore.numOfDangerMeasurements && gasStore.numOfModerateMeasurements,
	);
</script>

<template>
	<PieChart v-if="isDataExist" :chart-data="data" />

	<p v-else class="text-center">
		{{
			$t('pages./.gas.pie-chart.404', "There isn't enough data for a pie chart")
		}}
	</p>
</template>
