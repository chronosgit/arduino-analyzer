<script setup lang="ts">
	import { LineChart } from 'vue-chart-3';

	const data = {
		labels: Array.from({ length: 100 }, (_, i) => i / 4 + 1),
		datasets: [
			{
				label: 'Temperature',
				data: Array.from(
					{ length: 100 },
					() => Math.floor(Math.random() * 60) + 50,
				),
				fill: false,
				borderColor: 'rgb(75, 192, 192)',
				tension: 0.1,
			},
		],
	};
</script>

<template>
	<LineChart :chart-data="data" />
</template>
