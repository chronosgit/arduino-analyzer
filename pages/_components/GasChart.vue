<script setup lang="ts">
	import { LineChart } from 'vue-chart-3';
	import { useGasStore } from '~/store/useGasStore';

	const gasStore = useGasStore();

	const data = computed(() => ({
		labels: gasStore.gas.map((_, i) => i + 1),
		datasets: [
			{
				label: 'Gas density',
				data: gasStore.gas,
				tension: 0.1,
				borderColor: 'rgb(200, 200, 230)',

				pointBackgroundColor: gasStore.gas.map((value) =>
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
