<script setup lang="ts">
	import { LineChart } from 'vue-chart-3';
	import { useGasStore } from '~/store/useGasStore';

	const { t } = useI18n();

	const gasStore = useGasStore();

	const gasValues = computed(() => gasStore.gas.map((g) => g.value));

	const data = computed(() => ({
		labels: gasValues.value.map((_, i) => i + 1),
		datasets: [
			{
				label: t('pages./.gas.line-chart', 'Gas density'),
				data: gasValues.value,
				tension: 0.1,
				borderColor: 'rgb(200, 200, 230)',
				pointBackgroundColor: gasValues.value.map((value) =>
					value > 600 ? 'red' : 'lime',
				),
			},
		],
	}));
</script>

<template>
	<div>
		<LineChart :chart-data="data" />
	</div>
</template>
