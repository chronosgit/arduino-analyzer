import type IServerApiResponse from '~/interfaces/IServerApiResponse';

// eslint-disable-next-line
class DbService {
	static getDbConnectionState = () => {
		return $fetch<IServerApiResponse<boolean>>('/api/db/healthcheck');
	};
}

export default DbService;
