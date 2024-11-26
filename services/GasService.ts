import type IGas from '~/interfaces/features/gas/IGas';
import type IServerApiResponse from '~/interfaces/IServerApiResponse';

// eslint-disable-next-line
class GasService {
	static async getGasRecordsFromDb(offset?: number, limit?: number) {
		return $fetch<IServerApiResponse<IGas[]>>('/api/gas', {
			params: { offset, limit },
		});
	}

	static async postEspGasRecordToDb() {
		return $fetch<IServerApiResponse<number>>('/api/esp/gas', {
			method: 'POST',
		});
	}
}

export default GasService;
