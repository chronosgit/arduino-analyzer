import TemperatureModel from '~/server/models/TemperatureModel';

export default defineEventHandler(async (e) => {
	try {
		const { qOffset, qLimit } = getQuery(e);

		const offset = qOffset ? parseInt(qOffset.toString()) : 0;
		const limit = qLimit ? parseInt(qLimit.toString()) : 1;

		const temperature = await TemperatureModel.find()
			.sort({ timestamp: -1 })
			.skip(offset)
			.limit(limit);

		return getSuccessResponse(200, 'Got temperature records', temperature);
	} catch (err) {
		console.error(err);

		throw err;
	}
});
