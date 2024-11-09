import TemperatureService from '~/services/TemperatureService';

export const useTemperatureStore = defineStore('TemperatureStore', () => {
	const temperature = ref<number[]>([]);

	const fetchTemperatureDensity = async () => {
		try {
			const { data: fetchedTemperatureInCelcius } =
				await TemperatureService.getTemperatureInCelcius();

			temperature.value.push(fetchedTemperatureInCelcius);

			return fetchedTemperatureInCelcius;
		} catch (err) {
			console.error(err);

			return null;
		}
	};

	const clearTemperatureValue = () => {
		temperature.value = [];
	};

	return { temperature, fetchTemperatureDensity, clearTemperatureValue };
});
