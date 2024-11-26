import TemperatureModel from '~/server/models/TemperatureModel';
import constants from '~/utils/constants';

export default defineEventHandler(async (e) => {
	try {
		const { offset: qOffset, limit: qLimit } = getQuery(e);

		const offset = qOffset ? parseInt(qOffset.toString()) : 0;
		const limit = qLimit ? parseInt(qLimit.toString()) : 50;

		const temperature = await TemperatureModel.find()
			.sort({ timestamp: -1 })
			.skip(offset)
			.limit(limit);

		let numberOfColdTemperatureMeasurements = 0;
		let numberOfWarmTemperatureMeasurements = 0;
		let numberOfHotTemperatureMeasurements = 0;

		temperature.forEach((temperature) => {
			const value = temperature.value;

			if (value <= constants['maxColdTemperatureInCelcius']) {
				numberOfColdTemperatureMeasurements++;
			} else if (value <= constants['maxWarmTemperatureInCelcius']) {
				numberOfWarmTemperatureMeasurements++;
			} else {
				numberOfHotTemperatureMeasurements++;
			}
		});

		return getSuccessResponse(200, 'Got temperature records', {
			temperature,
			numberOfColdTemperatureMeasurements,
			numberOfWarmTemperatureMeasurements,
			numberOfHotTemperatureMeasurements,
		});
	} catch (err) {
		console.error(err);

		throw err;
	}
});
