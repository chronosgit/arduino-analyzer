import TemperatureModel from '~/server/models/TemperatureModel';
import checkForDbConnection from '~/server/utils/checkForDbConnection';

export default defineEventHandler(async () => {
	try {
		checkForDbConnection();

		await TemperatureModel.deleteMany();

		return getSuccessResponse(204, 'Cleared all temperature records');
	} catch (err) {
		console.error(err);

		throw err;
	}
});
