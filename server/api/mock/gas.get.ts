import getSuccessResponse from '~/server/utils/getSuccessResponse';

export default defineEventHandler(async () => {
	try {
		const randomGas = Math.random() * 1023;

		return getSuccessResponse(200, 'Received gas density', randomGas);
	} catch (err) {
		console.error(err);

		throw err;
	}
});
