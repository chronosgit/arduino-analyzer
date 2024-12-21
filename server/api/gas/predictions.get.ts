import * as tf from '@tensorflow/tfjs';
import GasModel from '~/server/models/GasModel';

export default defineEventHandler(async (e) => {
	try {
		const { size: qSize, gasType } = getQuery(e);
		const size = parseInt(qSize as string);

		if (Number.isNaN(qSize) || gasType == null) {
			throw createError({ statusCode: 400, message: 'Invalid params' });
		}

		const gas = await GasModel.find({ type: gasType })
			.sort({ timestamp: -1 })
			.limit(size);
		if (gas == null || gas.length === 0) {
			throw createError({
				statusCode: 404,
				message: 'Not enough data for training',
			});
		}

		const data = gas.map((g) => g.value);
		const predictions = await generatePredictions(data);

		return getSuccessResponse(200, 'Predicted values', predictions);
	} catch (err) {
		console.error(err);

		throw err;
	}
});

async function generatePredictions(data: number[]) {
	const model = tf.sequential();
	model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

	model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });

	// Generate synthetic data for training (you would replace this with real training data)
	const xs = tf.tensor2d([1, 2, 3, 4], [4, 1]);
	const ys = tf.tensor2d([1, 3, 5, 7], [4, 1]);

	// Train the model using the data
	await model.fit(xs, ys, { epochs: 10 });

	// Convert input array (data) to a tensor for prediction
	const inputTensor = tf.tensor2d(data, [data.length, 1]);

	// Get predictions for each value in the input array
	const prediction = model.predict(inputTensor) as tf.Tensor;

	// Get the prediction values
	const predictedValues = await prediction.data(); // Returns a promise that resolves to a typed array

	return Array.from(predictedValues); // Convert typed array to a regular array
}
