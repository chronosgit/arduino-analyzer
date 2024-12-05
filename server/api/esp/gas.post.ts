import GasModel from '~/server/models/GasModel';
import checkForDbConnection from '~/server/utils/checkForDbConnection';
import type IBaseEspResponse from '~/server/interfaces/features/esp/IBaseEspResponse';

export default defineEventHandler(async (e) => {
	try {
		checkForDbConnection();

		const { espIpAddress } = await readBody(e);

		if (espIpAddress == null) {
			throw createError({
				statusCode: 400,
				message: 'Invalid ESP IP address',
			});
		}

		const res = await $fetch<IBaseEspResponse<{
			lpg?: number | null;
			methane?: number | null;
			smoke?: number | null;
			hydrogen?: number | null;
			ethanol?: number | null;
			butane?: number | null;
			co?: number | null;
		}> | null>(`http://${espIpAddress}/api/v1/gas`);

		if (res == null || res.data == null) {
			throw createError({
				statusCode: 404,
				message: 'Received no response from ESP',
			});
		}

		const gases = res.data;
		await Promise.all(
			Object.entries(gases).map(([gasType, gasVal]) =>
				new GasModel({
					type: gasType,
					value: gasVal,
					timestamp: new Date(),
				}).save(),
			),
		);

		return getSuccessResponse(
			200,
			'Received gas record from ESP and posted to DB',
			res.data,
		);
	} catch (err) {
		console.error(err);

		throw err;
	}
});
