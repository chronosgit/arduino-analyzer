import { useTemperatureStore } from '~/store/useTemperatureStore';
import TemperatureService from '~/services/TemperatureService';

export default function () {
	const temperatureStore = useTemperatureStore();

	const {
		data: analytics,
		status,
		execute: fetchAnalytics,
	} = useLazyAsyncData(
		'features.gas.useTemperatureAnalytics',
		async () => {
			try {
				const res = await TemperatureService.getTemperatureAnalytics(
					temperatureStore.analyticsSampleSize,
				);
				if (res == null) return null;

				return res?.data;
			} catch (err) {
				console.error(err);

				return null;
			}
		},
		{ immediate: false },
	);

	const isLoading = computed(() => status.value === 'pending');

	return { analytics, isLoading, fetchAnalytics };
}
