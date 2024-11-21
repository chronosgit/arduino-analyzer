export const useCurSessionStore = defineStore('curSessionStore', () => {
	const localePath = useLocalePath();

	const espIpAddress = ref<string | null>(null);

	const isSessionRdy = ref(false);
	const isEspAlive = ref<boolean | null>(null);

	const startSession = (ip: string) => {
		if (!verifyIPv4Address(ip)) return;

		espIpAddress.value = ip.trim();

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
