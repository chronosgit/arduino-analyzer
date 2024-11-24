import type IServerApiResponse from '~/interfaces/IServerApiResponse';

// eslint-disable-next-line
class EspService {
	static async checkEspState() {
		return $fetch<IServerApiResponse<boolean | null>>('/api/esp/healthcheck');
	}
}

export default EspService;
