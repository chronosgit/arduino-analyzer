import getRandomNumBetween from '~/server/utils/getRandomNumBetween';
import getSuccessResponse from '~/server/utils/getSuccessResponse';

export default defineEventHandler(async () => {
	try {
		const randomCelcius = getRandomNumBetween(-50, 125);

		return getSuccessResponse(
			200,
			'Received temperature in Celcius',
			randomCelcius,
		);
	} catch (err) {
		console.error(err);

		throw err;
	}
});
