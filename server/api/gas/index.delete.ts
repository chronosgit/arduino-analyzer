import GasModel from '~/server/models/GasModel';

export default defineEventHandler(async () => {
	try {
		await GasModel.deleteMany();

		return getSuccessResponse(204, 'Cleared all gas records');
	} catch (err) {
		console.error(err);

		throw err;
	}
});
