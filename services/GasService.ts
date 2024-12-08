import type IGas from '~/interfaces/features/gas/IGas';
import type { TGasType } from '~/interfaces/features/gas/TGasType';
import type IServerApiResponse from '~/interfaces/IServerApiResponse';

// eslint-disable-next-line
class GasService {
	// eg. gasTypes = 'methane.hydrogen.lcg'
	static async getGasRecordsFromDb(
		offset?: number,
		limit?: number,
		gasTypes?: TGasType[],
	) {
		if (limit === 0) {
			console.error('Limit minimum is 1');
			return;
		}

		return $fetch<
			IServerApiResponse<{
				gas: IGas[];
				numberOfModerateGasMeasurements: number;
				numberOfDangerGasMeasurements: number;
			}>
		>('/api/gas', {
			method: 'GET',
			params: { offset, limit, types: gasTypes },
		});
	}

	static async getGasPredictions(gasType: TGasType, size: number) {
		return $fetch<IServerApiResponse<number[]>>('/api/gas/predictions', {
			method: 'GET',
			params: { size, gasType },
		});
	}

	static async triggerGasPredictionsTraining() {
		return $fetch<IServerApiResponse<unknown>>('/api/gas/predictions/train', {
			method: 'PUT',
		});
	}

	static async postEspGasRecordToDb(espIpAddress: string) {
		if (!espIpAddress) throw createError('Invalid espIpAddress');

		return $fetch<
			IServerApiResponse<{
				butane?: number | null;
				co?: number | null;
				ethanol?: number | null;
				hydrogen?: number | null;
				lpg?: number | null;
				methane?: number | null;
				smoke?: number | null;
			}>
		>('/api/esp/gas', {
			method: 'POST',
			body: { espIpAddress },
		});
	}

	static async deleteGasRecordsFromDb() {
		return $fetch<IServerApiResponse<null | undefined>>('/api/gas', {
			method: 'DELETE',
		});
	}
}

export default GasService;
