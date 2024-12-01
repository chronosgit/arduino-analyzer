export default function (data: number[], futureCnt = 50) {
	const n = data.length;
	const x = [...Array(n).keys()]; // Generate indices [0, 1, 2, ..., n-1]
	const sumX = x.reduce((a, b) => a + b, 0);
	const sumY = data.reduce((a, b) => a + b, 0);
	const sumXY = x.reduce((sum, xi, i) => sum + xi * data[i], 0);
	const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0);

	// Calculate slope (m) and intercept (b)
	const m = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX ** 2);
	const b = (sumY - m * sumX) / n;

	// Predict future values
	const predictedValues = [];
	for (let i = n; i < n + futureCnt; i++) {
		const predicted = m * i + b;
		predictedValues.push(predicted);
	}
	return predictedValues;
}
