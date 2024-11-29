import TemperatureModel from '~/server/models/TemperatureModel';

export default defineEventHandler(async (e) => {
	try {
		checkForDbConnection();

		const { lastRecordsToAnalyze: qLast } = getQuery(e);
		if (qLast == null) {
			throw createError({ statusCode: 400, message: 'Missing param' });
		}

		const last = parseInt(qLast.toString());
		if (Number.isNaN(last)) {
			throw createError({
				statusCode: 500,
				message: 'Invalid number conversion',
			});
		}

		if (last <= 0) {
			throw createError({
				statusCode: 400,
				message: 'Invalid query param',
			});
		}

		const lastTemperatureRecords = await TemperatureModel.find()
			.sort({ timestamp: -1 })
			.limit(last);

		if (lastTemperatureRecords.length === 0) {
			throw createError({
				statusCode: 404,
				message: 'No data for analytics',
			});
		}

		const temperatures = lastTemperatureRecords.map((record) => record.value);

		// Calculating the quartiles
		temperatures.sort((a, b) => a - b); // Sort values in ascending order
		const q1 = temperatures[Math.floor(temperatures.length * 0.25)];
		const q3 = temperatures[Math.floor(temperatures.length * 0.75)];
		const iqr = q3 - q1;

		// Defining bounds
		const lowerBound = q1 - 1.5 * iqr;
		const upperBound = q3 + 1.5 * iqr;

		// Filtering out outliers
		const filteredTemperatures = temperatures.filter(
			(temp) => temp >= lowerBound && temp <= upperBound,
		);

		const meanTemperature =
			filteredTemperatures.reduce((acc, cur) => acc + cur, 0) /
			filteredTemperatures.length;

		return getSuccessResponse(200, 'Received analytics', {
			averageTemperatureInCelcius: meanTemperature,
		});
	} catch (err) {
		console.error(err);

		throw err;
	}
});
