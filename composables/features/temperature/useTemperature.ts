import { useCurSessionStore } from '~/store/useCurSessionStore';
import { useTemperatureStore } from '~/store/useTemperatureStore';
import TemperatureService from '~/services/TemperatureService';
import type ITemperature from '~/interfaces/features/temperature/ITemperature';

export default function () {
	const curSessionStore = useCurSessionStore();
	const temperatureStore = useTemperatureStore();

	const {
		data: lastTemperature,
		status,
		execute,
	} = useLazyAsyncData(
		'features.temperature.useTemperature',
		async () => {
			try {
				const res = await TemperatureService.getTemperatureRecordsFromDb(
					temperatureStore.filterOffset,
					temperatureStore.filterLimit,
				);
				if (res?.data == null) return null;

				const {
					data: {
						temperature,
						numberOfColdTemperatureMeasurements,
						numberOfWarmTemperatureMeasurements,
						numberOfHotTemperatureMeasurements,
					},
				} = res;

				temperatureStore.addTemperature(temperature);
				temperatureStore.updatedMeasurementCounts(
					numberOfColdTemperatureMeasurements,
					numberOfWarmTemperatureMeasurements,
					numberOfHotTemperatureMeasurements,
				);

				return temperature;
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

	return { lastTemperature, isLoading, fetchTemperatureFromDb: execute };
}
