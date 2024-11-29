import GasModel from '~/server/models/GasModel';
import checkForDbConnection from '~/server/utils/checkForDbConnection';
import constants from '~/utils/constants';
import type { TGasType } from '~/interfaces/features/gas/TGasType';

export default defineEventHandler(async (e) => {
	try {
		checkForDbConnection();

		const { offset: qOffset, limit: qLimit, types: qTypes } = getQuery(e);

		const offset = qOffset ? parseInt(qOffset.toString()) : 0;
		const limit = qLimit ? parseInt(qLimit.toString()) || 50 : 50;

		let gasTypes: TGasType[] = [];

		if (
			typeof qTypes === 'string' &&
			constants['gasTypes'].includes(qTypes as TGasType)
		) {
			gasTypes.push(qTypes as TGasType);
		} else if (Array.isArray(qTypes)) {
			gasTypes = (qTypes as TGasType[]).filter((t) =>
				constants['gasTypes'].includes(t as TGasType),
			);
		}

		const gas = (
			await Promise.all(
				gasTypes.map(async (type) => {
					return GasModel.find({ type })
						.sort({ timestamp: -1 })
						.skip(offset)
						.limit(limit);
				}),
			)
		).flat();

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
