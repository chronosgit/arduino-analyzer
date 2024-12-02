<script setup lang="ts">
	import { LineChart } from 'vue-chart-3';
	import type { TGasType } from '~/interfaces/features/gas/TGasType';
	import { useGasStore } from '~/store/useGasStore';

	const { t } = useI18n();

	const gasStore = useGasStore();

	const data = computed(() => {
		if (!gasStore.gasPredictions.length) return [];

		const labels = gasStore.gasPredictions[0].values.map(
			(_, index) => index + 1,
		);

		const datasets = gasStore.gasPredictions.map(({ type, values }) => ({
			label: t(`dictionary.${type}`, type.toUpperCase()),
			data: values,
			tension: 0.1,
			borderColor: getBorderColor(type as TGasType),
			pointBackgroundColor: values.map((v) => (v > 600 ? 'red' : 'lime')),
		}));

		return {
			labels,
			datasets,
		};
	});

	const getBorderColor = (type: TGasType) => {
		const colors: Record<TGasType, string> = {
			methane: 'rgb(255, 99, 132)',
			hydrogen: 'rgb(54, 162, 235)',
			smoke: 'rgb(75, 192, 192)',
			butane: 'rgb(153, 102, 255)',
			ethanol: 'rgb(255, 159, 64)',
			co: 'rgb(201, 203, 207)',
			lpg: 'rgb(255, 205, 86)',
		};

		return colors[type];
	};
</script>

<template>
	<div>
		<LineChart :chart-data="data" />
	</div>
</template>
