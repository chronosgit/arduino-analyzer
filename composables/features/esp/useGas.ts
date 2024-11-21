import { useCurSessionStore } from '~/store/useCurSessionStore';
import { useGasStore } from '~/store/useGasStore';
import GasService from '~/services/GasService';

export default function () {
	const curSessionStore = useCurSessionStore();
	const gasStore = useGasStore();

	const timer = ref<ReturnType<typeof setInterval> | null>(null);

	const {
		data: lastGas,
		status,
		execute,
	} = useLazyAsyncData(
		'useGas',
		async () => {
			try {
				const { data: fetchedGas } = await GasService.getGasDensity();

				gasStore.addGasMeasurement(Math.floor(fetchedGas));

				return Math.floor(fetchedGas);
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

	return { lastGas, isLoading };
}
