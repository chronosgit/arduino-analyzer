import type IServerApiResponse from '~/interfaces/IServerApiResponse';

// eslint-disable-next-line
class TemperatureService {
	static async getTemperatureInCelcius() {
		return $fetch<IServerApiResponse<number>>('/api/esp/temperature', {
			method: 'POST',
		});
	}
}

export default TemperatureService;
