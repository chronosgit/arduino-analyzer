import ARIMA from 'arima';
import ArimaModel from '~/server/models/ArimaModel';
import GasModel from '~/server/models/GasModel';

export default defineEventHandler(async () => {
	try {
		checkForDbConnection();

		const measurements = await GasModel.find().limit(100);

		if (
			!measurements ||
			!Array.isArray(measurements) ||
			measurements.length === 0
		) {
			throw createError({
				statusCode: 500,
				message: 'Invalid gas measurements',
			});
		}

		const arima = new ARIMA({ p: 5, d: 1, q: 0 });

		arima.train(measurements);

		// Fetch the cached ARIMA model from the database
		const cachedModel = await ArimaModel.findOne();

		if (!cachedModel) {
			// If the model doesn't exist in DB, create and save it
			const newModel = new ArimaModel({
				p: 5,
				d: 1,
				q: 0,
				trainedCoefficients: arima.model, // Save trained coefficients
				slidingWindow: measurements.slice(-100), // Store the last 100 measurements
			});

			await newModel.save();
		} else {
			// If model exists, update the trained coefficients and sliding window
			cachedModel.trainedCoefficients = arima.model;
			cachedModel.slidingWindow = measurements.slice(-100); // Keep the last 100 measurements
			cachedModel.lastUpdated = new Date();

			await cachedModel.save();
		}

		return getSuccessResponse(200, 'Model trained and saved successfully');
	} catch (err) {
		console.error(err);

		throw err;
	}
});
