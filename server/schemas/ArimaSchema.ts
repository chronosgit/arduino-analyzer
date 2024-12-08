import mongoose from 'mongoose';

const ArimaSchema = new mongoose.Schema({
	// The 'p' parameter of the ARIMA model (number of lag observations in the model).
	p: { type: Number, required: true },

	// The 'd' parameter of the ARIMA model (degree of differencing to make the time series stationary).
	d: { type: Number, required: true },

	// The 'q' parameter of the ARIMA model (size of the moving average window).
	q: { type: Number, required: true },

	// Coefficients or weights of the trained ARIMA model (used to restore the model state).
	trainedCoefficients: { type: Array, required: true },

	// The most recent measurements used to train the model (e.g., last 100 data points).
	slidingWindow: { type: Array, required: true },

	// Timestamp to track when the model was last trained or updated.
	lastUpdated: { type: Date, default: Date.now },
});

export default ArimaSchema;
