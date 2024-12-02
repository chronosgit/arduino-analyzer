import { useGasStore } from '~/store/useGasStore';
import GasService from '~/services/GasService';
import type IGas from '~/interfaces/features/gas/IGas';

export default function () {
	const gasStore = useGasStore();

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
					gasStore.filterByType.filter((f) => f.isSelected).map((f) => f.name),
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

	return { gas, isLoading, fetchGasFromDb: execute };
}
