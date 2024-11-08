export const useCurSessionStore = defineStore('curSessionStore', () => {
	const isSessionRdy = ref(false);

	const startSession = () => (isSessionRdy.value = true);
	const closeSession = () => (isSessionRdy.value = false);

	return { isSessionRdy, startSession, closeSession };
});
