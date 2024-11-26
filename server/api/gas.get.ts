import GasModel from '~/server/models/GasModel';

export default defineEventHandler(async () => {
	try {
		const res = await GasModel.find();

		return getSuccessResponse(200, 'Got gas records', res);
	} catch (err) {
		console.error(err);

		throw err;
	}
});
