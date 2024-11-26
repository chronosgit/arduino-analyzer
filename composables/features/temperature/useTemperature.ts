import { useCurSessionStore } from '~/store/useCurSessionStore';
import { useTemperatureStore } from '~/store/useTemperatureStore';
import TemperatureService from '~/services/TemperatureService';
import type ITemperature from '~/interfaces/features/temperature/ITemperature';

export default function () {
	const curSessionStore = useCurSessionStore();
	const temperatureStore = useTemperatureStore();

	const offset = ref(0);
	const limit = ref(50);

	const timer = ref<ReturnType<typeof setInterval> | null>(null);

	const {
		data: lastTemperature,
		status,
		execute,
	} = useLazyAsyncData(
		'features.temperature.useTemperature',
		async () => {
			try {
				const res = await TemperatureService.getTemperatureRecordsFromDb(
					offset.value,
					limit.value,
				);

				if (res == null) return null;

				const { data: fetchedTemp } = res;

				temperatureStore.completelyReAddTemperature(fetchedTemp);

				return fetchedTemp;
			} catch (err) {
				console.error(err);

				return null;
			}
		},
		{
			immediate: false,
			transform: (temp: ITemperature[] | null | undefined) => {
				if (temp == null) return null;

				return temp.map((f) => ({
					...f,
					value: Math.floor(f.value),
				}));
			},
		},
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
