import ARIMA from 'arima';
import ArimaModel from '~/server/models/ArimaModel';
import GasModel from '~/server/models/GasModel';
import constants from '~/utils/constants';
import type { TGasType } from '~/server/interfaces/features/gas/TGasType';

export default defineEventHandler(async (e) => {
	try {
		checkForDbConnection();

		const { size: qSize, gasType } = getQuery(e);
		const size = Number(qSize);

		if (size == null || Number.isNaN(size) || size <= 0) {
			throw createError({
				statusCode: 400,
				message: 'Invalid size query param',
			});
		}

		if (!constants['gasTypes'].includes(gasType as TGasType)) {
			throw createError({
				statusCode: 400,
				message: 'Invalid gas type',
			});
		}

		const measurements = await GasModel.find({ type: gasType })
			.sort({ timestamp: -1 })
			.limit(size);
		if (
			measurements == null ||
			!Array.isArray(measurements) ||
			measurements.length === 0
		) {
			throw createError({
				statusCode: 500,
				message: 'Insufficient gas measurements',
			});
		}

		const cachedModel = await ArimaModel.findOne();
		if (!cachedModel) {
			throw createError({
				statusCode: 404,
				message: "Model isn't trained yet",
			});
		}

		// Recreate the ARIMA model with stored parameters and coefficients
		const arima = new ARIMA({
			p: cachedModel.p,
			d: cachedModel.d,
			q: cachedModel.q,
		});

		// Load the trained model coefficients into the ARIMA instance
		// arima.setModel(cachedModel.trainedCoefficients);

		// Train the ARIMA model with the sliding window (e.g., the last 100 measurements)
		const window = measurements.map((m) => m.value);
		await arima.train(window);

		// Predict the next set of values (equal to the length of the input measurements)
		const forecast = await arima.predict(window.length);
		if (!forecast || !forecast[0]) {
			throw createError({
				statusCode: 500,
				message: 'Invalid forecast results',
			});
		}

		return getSuccessResponse(200, 'Received forecast', forecast[0]);
	} catch (err) {
		console.error(err);

		throw err;
	}
});
