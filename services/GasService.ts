import type IGas from '~/interfaces/features/gas/IGas';
import type IServerApiResponse from '~/interfaces/IServerApiResponse';

// eslint-disable-next-line
class GasService {
	static async getGasRecordsFromDb(offset?: number, limit?: number) {
		return $fetch<
			IServerApiResponse<{
				gas: IGas[];
				numberOfModerateGasMeasurements: number;
				numberOfDangerGasMeasurements: number;
			}>
		>('/api/gas', {
			method: 'GET',
			params: { offset, limit },
		});
	}

	static async postEspGasRecordToDb() {
		return $fetch<IServerApiResponse<number>>('/api/esp/gas', {
			method: 'POST',
		});
	}

	static async deleteGasRecordsFromDb() {
		return $fetch<IServerApiResponse<null | undefined>>('/api/gas', {
			method: 'DELETE',
		});
	}
}

export default GasService;
