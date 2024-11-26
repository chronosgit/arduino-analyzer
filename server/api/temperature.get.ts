import TemperatureModel from '~/server/models/TemperatureModel';

export default defineEventHandler(async () => {
	try {
		const res = await TemperatureModel.find();

		return getSuccessResponse(200, 'Got temperature records', res);
	} catch (err) {
		console.error(err);

		throw err;
	}
});
