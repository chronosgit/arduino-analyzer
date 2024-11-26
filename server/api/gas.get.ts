import GasModel from '~/server/models/GasModel';

export default defineEventHandler(async (e) => {
	try {
		const { qOffset, qLimit } = getQuery(e);

		const offset = qOffset ? parseInt(qOffset.toString()) : 0;
		const limit = qLimit ? parseInt(qLimit.toString()) : 1;

		const gas = await GasModel.find()
			.sort({ timestamp: -1 })
			.skip(offset)
			.limit(limit);

		return getSuccessResponse(200, 'Got gas records', gas);
	} catch (err) {
		console.error(err);

		throw err;
	}
});
