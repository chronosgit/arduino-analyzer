export default function () {
	const gasTypes = [
		'butane',
		'co',
		'ethanol',
		'hydrogen',
		'lpg',
		'methane',
		'smoke',
	];

	return gasTypes[Math.floor(Math.random() * (gasTypes.length - 1))];
}
