import type IBaseEspResponse from '~/server/interfaces/features/esp/IBaseEspResponse';

export default defineEventHandler(async (e) => {
	try {
		const { espIpAddress } = getQuery(e);

		if (espIpAddress == null) {
			throw createError({
				statusCode: 400,
				message: 'Invalid ESP IP address',
			});
		}

		const res = await $fetch<IBaseEspResponse<string> | null>(
			`http://${espIpAddress}/api/v1/healthcheck`,
		);
		if (res == null) {
			throw createError({
				statusCode: 404,
				message: 'Received no response from ESP',
			});
		}

		return getSuccessResponse(200, 'Received ESP state', res.data);
	} catch (err) {
		console.error(err);

		throw err;
	}
});
