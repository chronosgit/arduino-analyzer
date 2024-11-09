<script setup lang="ts">
	import ArduinoStateHeading from './_components/ArduinoStateHeading.vue';
	import GasChart from './_components/GasChart.vue';
	import TemperatureChart from './_components/TemperatureChart.vue';

	const { isArduinoAlive } = useArduino();

	useGas();
	useTemperature();

	provide('isArduinoAlive', isArduinoAlive);
</script>

<template>
	<div class="px-2 pt-8 h-screen dark:bg-zinc-900">
		<div class="container pb-12 mx-auto space-y-14">
			<ArduinoStateHeading />

			<GasChart />

			<TemperatureChart />
		</div>
	</div>
</template>
