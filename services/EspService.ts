import type IServerApiResponse from '~/interfaces/IServerApiResponse';

// eslint-disable-next-line
class EspService {
	static async checkEspState(espIpAddress: string) {
		if (!espIpAddress) throw createError('Invalid espIpAddress');

		return $fetch<
			IServerApiResponse<{
				status?: boolean;
				message?: string;
				data?: unknown;
			}>
		>('/api/esp/healthcheck', {
			method: 'GET',
			params: { espIpAddress },
		});
	}
}

export default EspService;
