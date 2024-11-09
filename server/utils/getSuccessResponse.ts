export default function (
	statusCode?: number,
	statusMessage?: string,
	data?: number | string | object,
) {
	return {
		success: true,
		statusCode: statusCode ?? 200,
		statusMessage: statusMessage ?? 'Success',
		data: data ?? null,
	};
}
