import type IEspServerBaseResponse from '~/interfaces/features/esp/IEspServerBaseResponse';
import type IServerApiResponse from '~/interfaces/IServerApiResponse';

// eslint-disable-next-line
class EspService {
	static async checkEspState(espIpAddress: string) {
		if (!espIpAddress) throw createError('Invalid espIpAddress');

		return $fetch<IServerApiResponse<IEspServerBaseResponse<unknown>>>(
			'/api/esp/healthcheck',
			{
				method: 'GET',
				params: { espIpAddress },
			},
		);
	}
}

export default EspService;
