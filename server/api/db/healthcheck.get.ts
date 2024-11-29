export default defineEventHandler(() => {
	try {
		if (!isDbConnected()) {
			return getSuccessResponse(200, 'Connection state retrieved', false);
		}

		return getSuccessResponse(200, 'Connection state retrieved', true);
	} catch (err) {
		console.error(err);

		throw err;
	}
});
