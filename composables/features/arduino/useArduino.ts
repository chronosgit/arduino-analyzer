import ArduinoService from '~/services/ArduinoService';
import { useCurSessionStore } from '~/store/useCurSessionStore';

export default function () {
	const curSessionStore = useCurSessionStore();

	const timer = ref<ReturnType<typeof setInterval> | null>(null);

	const {
		data: isArduinoAlive,
		status,
		execute,
	} = useLazyAsyncData(
		'useArduino',
		async () => {
			try {
				const { data } = await ArduinoService.checkArduinoState();

				return data;
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

	return { isArduinoAlive, isLoading };
}
