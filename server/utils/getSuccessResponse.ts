export default function (
	statusCode?: number,
	statusMessage?: string,
	data?: number | string | object | boolean | null,
) {
	return {
		success: true,
		statusCode: statusCode ?? 200,
		statusMessage: statusMessage ?? 'Success',
		data: data ?? null,
	};
}
