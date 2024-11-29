import constants from '~/utils/constants';

export default function () {
	const gasTypes = constants['gasTypes'];

	return gasTypes[Math.floor(Math.random() * (gasTypes.length - 1))];
}
