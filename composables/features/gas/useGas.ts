import { useCurSessionStore } from '~/store/useCurSessionStore';
import { useGasStore } from '~/store/useGasStore';
import GasService from '~/services/GasService';
import type IGas from '~/interfaces/features/gas/IGas';

export default function () {
	const curSessionStore = useCurSessionStore();
	const gasStore = useGasStore();

	const timer = ref<ReturnType<typeof setInterval> | null>(null);

	const {
		data: gas,
		status,
		execute,
	} = useLazyAsyncData<IGas[] | null>(
		'features.gas.useGas',
		async () => {
			try {
				const res = await GasService.getGasRecordsFromDb(
					gasStore.filterOffset,
					gasStore.filterLimit,
				);
				if (res?.data == null) return null;

				const {
					data: {
						gas,
						numberOfDangerGasMeasurements,
						numberOfModerateGasMeasurements,
					},
				} = res;

				gasStore.addGas(gas);
				gasStore.updateMeasurementCounts(
					numberOfModerateGasMeasurements,
					numberOfDangerGasMeasurements,
				);

				return gas;
			} catch (err) {
				console.error(err);

				return null;
			}
		},
		{ immediate: false },
	);

	const isLoading = computed(() => status.value === 'pending');

	onMounted(() => {
		timer.value = setInterval(() => {
			if (!curSessionStore.isSessionRdy) return;

			execute();
		}, 3000);
	});

	onUnmounted(() => {
		if (timer.value) {
			clearInterval(timer.value);
		}
	});

	return { gas, isLoading, fetchGasFromDb: execute };
}
