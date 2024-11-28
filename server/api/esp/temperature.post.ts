import TemperatureModel from '~/server/models/TemperatureModel';
import checkForDbConnection from '~/server/utils/checkForDbConnection';

export default defineEventHandler(async () => {
	try {
		checkForDbConnection();

		// Get temperature from ESP
		// WARN: currently a mock logic
		const randomCelcius = getRandomNumBetween(-50, 125);

		const temperatureRecord = new TemperatureModel({
			type: 'celcius',
			value: randomCelcius,
			timestamp: new Date(),
		});
		await temperatureRecord.save();

		return getSuccessResponse(
			200,
			'Got temperature record from ESP and posted to DB',
			temperatureRecord,
		);
	} catch (err) {
		console.error(err);

		throw err;
	}
});
