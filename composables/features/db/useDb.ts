import DbService from '~/services/DbService';

export default function () {
	const {
		data: isDbConnected,
		status,
		execute: fetchDbConnectionStatus,
	} = useLazyAsyncData(
		'features.db.useDb',
		async () => {
			try {
				const res = await DbService.getDbConnectionState();

				if (res?.data == null) return null;

				return res.data;
			} catch (err) {
				console.error(err);

				return null;
			}
		},
		{ immediate: false },
	);

	const isLoading = computed(() => status.value === 'pending');

	return { isDbConnected, isLoading, fetchDbConnectionStatus };
}
