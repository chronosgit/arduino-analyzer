import type IServerApiResponse from '~/interfaces/IServerApiResponse';

// eslint-disable-next-line
class GasService {
	static async getGasDensity() {
		return $fetch<IServerApiResponse<number>>('/api/esp/gas');
	}
}

export default GasService;
