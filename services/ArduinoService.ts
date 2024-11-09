import type IServerApiResponse from '~/interfaces/IServerApiResponse';

// eslint-disable-next-line
class ArduinoService {
	static async checkArduinoState() {
		return $fetch<IServerApiResponse<boolean | null>>('/api/healthcheck');
	}
}

export default ArduinoService;
