<script setup lang="ts">
	import { LineChart } from 'vue-chart-3';
	import type { TGasType } from '~/interfaces/features/gas/TGasType';
	import { useGasStore } from '~/store/useGasStore';

	const { t } = useI18n();

	const gasStore = useGasStore();

	const data = computed(() => {
		// Instead of 'most values' bs
		// we need to take the type with the best timestamps
		const groupedByType: Record<
			TGasType,
			{ value: number; timestamp: Date }[]
		> = {
			methane: [],
			hydrogen: [],
			smoke: [],
			butane: [],
			ethanol: [],
			co: [],
			lpg: [],
		};

		gasStore.gas.forEach((gas) => {
			groupedByType[gas.type].push({
				value: gas.value,
				timestamp: new Date(gas.timestamp),
			});
		});

		const typeWithMostValues = Object.keys(groupedByType).reduce((a, b) =>
			groupedByType[a as TGasType].length > groupedByType[b as TGasType].length
				? a
				: b,
		) as TGasType;

		const labels = groupedByType[typeWithMostValues].map(({ timestamp }) =>
			formatTimestamp(timestamp),
		);

		const datasets = Object.entries(groupedByType).map(([type, values]) => ({
			label: t(`dictionary.${type}`, type.toUpperCase()),
			data: values.map((item) => item.value),
			tension: 0.1,
			borderColor: getBorderColor(type as TGasType),
			pointBackgroundColor: values.map((item) =>
				item.value > 600 ? 'red' : 'lime',
			),
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
