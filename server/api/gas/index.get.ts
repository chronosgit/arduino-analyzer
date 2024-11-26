import GasModel from '~/server/models/GasModel';
import constants from '~/utils/constants';

export default defineEventHandler(async (e) => {
	try {
		const { offset: qOffset, limit: qLimit } = getQuery(e);

		const offset = qOffset ? parseInt(qOffset.toString()) : 0;
		const limit = qLimit ? parseInt(qLimit.toString()) : 50;

		const gas = await GasModel.find()
			.sort({ timestamp: -1 })
			.skip(offset)
			.limit(limit);

		let numOfModerateGas = 0;
		let numOfDangerGas = 0;

		gas.forEach((g) => {
			if (g.value <= constants.moderateGasThreshhold) numOfModerateGas++;
			else numOfDangerGas++;
		});

		return getSuccessResponse(200, 'Got gas records', {
			gas,
			numberOfModerateGasMeasurements: numOfModerateGas,
			numberOfDangerGasMeasurements: numOfDangerGas,
		});
	} catch (err) {
		console.error(err);

		throw err;
	}
});
