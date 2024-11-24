export default defineEventHandler(async () => {
	try {
		const mockStates = [true, false, null];

		const randomMockState = mockStates[Math.floor(Math.random() * 2)];

		return getSuccessResponse(200, 'Arduino is alive', randomMockState);
	} catch (err) {
		console.error(err);

		throw err;
	}
});
