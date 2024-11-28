export const useCurSessionStore = defineStore('curSessionStore', () => {
	const localePath = useLocalePath();

	const espIpAddress = ref<string | null>(null);

	const isSessionRdy = ref(true);
	const isEspAlive = ref<boolean | null>(null);

	const startSession = (ip?: string) => {
		if (ip && !verifyIPv4Address(ip)) return;

		espIpAddress.value = ip ? ip.trim() : null;

		isSessionRdy.value = true;
	};

	const closeSession = () => {
		espIpAddress.value = null;

		isSessionRdy.value = false;

		navigateTo(localePath('/closed'));
	};

	return {
		espIpAddress,
		isSessionRdy,
		isEspAlive,
		startSession,
		closeSession,
	};
});
