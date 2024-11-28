import GasModel from '~/server/models/GasModel';
import checkForDbConnection from '~/server/utils/checkForDbConnection';

export default defineEventHandler(async () => {
	try {
		checkForDbConnection();

		// Get gas value from ESP
		// WARN: currently a mock logic
		const randomGas = Math.random() * 1023;

		// Post gas value to DB
		const gasRecord = new GasModel({
			type: getRandomGasType(),
			value: randomGas,
			timestamp: new Date(),
		});
		await gasRecord.save();

		return getSuccessResponse(
			200,
			'Got gas record from ESP and posted to DB',
			gasRecord,
		);
	} catch (err) {
		console.error(err);

		throw err;
	}
});
