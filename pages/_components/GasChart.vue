<script setup lang="ts">
	import { LineChart } from 'vue-chart-3';
	import { useGasStore } from '~/store/useGasStore';

	const gasStore = useGasStore();

	const data = computed(() => ({
		labels: gasStore.gas.map((_, i) => i + 1),
		datasets: [
			{
				label: 'Gas',
				data: gasStore.gas,
				tension: 0.1,
				borderColor: 'rgb(144, 238, 144)',

				pointBackgroundColor: gasStore.gas.map((value) =>
					value > 600 ? 'rgb(255, 69, 0)' : 'rgb(144, 238, 144)',
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
