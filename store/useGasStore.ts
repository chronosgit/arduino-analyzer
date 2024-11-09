import GasService from '~/services/GasService';

export const useGasStore = defineStore('gasStore', () => {
	const gas = ref<number[]>([]);

	const fetchGasDensity = async () => {
		try {
			const { data: fetchedGas } = await GasService.getGasDensity();

			gas.value.push(fetchedGas);

			return fetchedGas;
		} catch (err) {
			console.error(err);

			return null;
		}
	};

	const clearGasValue = () => {
		gas.value = [];
	};

	return { gas, fetchGasDensity, clearGasValue };
});
