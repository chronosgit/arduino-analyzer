import GasModel from '~/server/models/GasModel';
import checkForDbConnection from '~/server/utils/checkForDbConnection';

export default defineEventHandler(async () => {
	try {
		checkForDbConnection();

		await GasModel.deleteMany();

		return getSuccessResponse(204, 'Cleared all gas records');
	} catch (err) {
		console.error(err);

		throw err;
	}
});
