import TemperatureModel from '~/server/models/TemperatureModel';

export default defineEventHandler(async () => {
	try {
		await TemperatureModel.deleteMany();

		return getSuccessResponse(204, 'Cleared all temperature records');
	} catch (err) {
		console.error(err);

		throw err;
	}
});
