export const useCurSessionStore = defineStore('curSessionStore', () => {
	const localePath = useLocalePath();

	const arduinoEspIpAddress = ref<string | null>(null);
	const isSessionRdy = ref(false);

	const startSession = (ip: string) => {
		if (!verifyIPv4Address(ip)) return;

		arduinoEspIpAddress.value = ip.trim();

		isSessionRdy.value = true;
	};

	const closeSession = () => {
		arduinoEspIpAddress.value = null;

		isSessionRdy.value = false;

		navigateTo(localePath('/closed'));
	};

	return { arduinoEspIpAddress, isSessionRdy, startSession, closeSession };
});
