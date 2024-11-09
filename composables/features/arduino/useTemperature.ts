import { useCurSessionStore } from '~/store/useCurSessionStore';
import { useTemperatureStore } from '~/store/useTemperatureStore';
import TemperatureService from '~/services/TemperatureService';

export default function () {
	const curSessionStore = useCurSessionStore();
	const temperatureStore = useTemperatureStore();

	const timer = ref<ReturnType<typeof setInterval> | null>(null);

	const {
		data: lastTemperature,
		status,
		execute,
	} = useLazyAsyncData(
		'useTemperature',
		async () => {
			try {
				const { data: fetchedTemp } =
					await TemperatureService.getTemperatureInCelcius();

				temperatureStore.addTemperatureMeasurement(Math.floor(fetchedTemp));

				return Math.floor(fetchedTemp);
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

	return { lastTemperature, isLoading };
}
