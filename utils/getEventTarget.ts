export default function (e: Event, targetType: 'target' | 'currentTarget') {
	if (e == null || e.target == null) {
		throw createError({
			statusCode: 404,
			message: "Event or target don't exist",
		});
	}

	if (!['target', 'currentTarget'].includes(targetType)) {
		throw createError({
			statusCode: 400,
			message: 'Invalid targetType',
		});
	}

	return e[targetType] as HTMLElement;
}
