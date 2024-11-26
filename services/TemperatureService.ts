import type ITemperature from '~/interfaces/features/temperature/ITemperature';
import type IServerApiResponse from '~/interfaces/IServerApiResponse';

// eslint-disable-next-line
class TemperatureService {
	static async getTemperatureRecordsFromDb() {
		return $fetch<IServerApiResponse<ITemperature[]>>('/api/temperature');
	}

	static async postEspTemperatureRecordToDb() {
		return $fetch<IServerApiResponse<ITemperature>>('/api/esp/temperature', {
			method: 'POST',
		});
	}
}

export default TemperatureService;
