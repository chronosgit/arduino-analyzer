import { useGasStore } from '~/store/useGasStore';
import GasService from '~/services/GasService';
import type IBaseGasGroupedByType from '~/interfaces/features/gas/IBaseGasGroupedByType';

export default function () {
	const gasStore = useGasStore();

	const {
		data: gasPredictions,
		status,
		execute,
	} = useLazyAsyncData<unknown[] | null>(
		'features.gas.gasPredictions',
		async () => {
			try {
				const selectedGasTypes = gasStore.filterByType
					.filter((f) => f.isSelected)
					.map((f) => f.name);

				const allPredicts = await Promise.all(
					selectedGasTypes.map(async (gt) => {
						const res = await GasService.getGasPredictions(
							gt,
							gasStore.filterLimit,
						);

						const predicts = <IBaseGasGroupedByType>{
							type: gt,
							values: res.data,
						};

						return predicts;
					}),
				);

				gasStore.updateGasPredictions(allPredicts);

				return allPredicts;
			} catch (err) {
				console.error(err);

				return null;
			}
		},
		{ immediate: false },
	);

	const isLoading = computed(() => status.value === 'pending');

	return { gasPredictions, isLoading, fetchGasPredictions: execute };
}
