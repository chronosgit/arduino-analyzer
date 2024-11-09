export default defineEventHandler(async () => {
	try {
		return getSuccessResponse(200, 'Arduino is alive');
	} catch (err) {
		console.error(err);

		throw err;
	}
});
