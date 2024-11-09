import type IServerApiResponse from '~/interfaces/IServerApiResponse';

// eslint-disable-next-line
class TemperatureService {
	static async getTemperatureInCelcius() {
		return $fetch<IServerApiResponse<number>>('/api/mock/temperature');
	}
}

export default TemperatureService;
