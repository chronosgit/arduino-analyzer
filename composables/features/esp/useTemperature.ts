import TemperatureService from '~/services/TemperatureService';
import { useCurSessionStore } from '~/store/useCurSessionStore';

export default function () {
	const curSessionStore = useCurSessionStore();

	const timer = ref<ReturnType<typeof setInterval> | null>(null);

	const {
		data: postedTemperatureFromEsp,
		status,
		execute,
	} = useLazyAsyncData(
		'features.esp.useTemperature',
		async () => {
			try {
				const res = await TemperatureService.postEspTemperatureRecordToDb();

				return res?.data;
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

	return {
		postedTemperatureFromEsp,
		isLoading,
		postTemperatureFromEsp: execute,
	};
}
