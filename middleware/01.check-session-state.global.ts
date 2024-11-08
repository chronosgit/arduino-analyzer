import { useCurSessionStore } from '~/store/useCurSessionStore';

export default defineNuxtRouteMiddleware(async (to) => {
	const localePath = useLocalePath();
	const curSessionStore = useCurSessionStore();

	if (!curSessionStore.isSessionRdy && !to.path.includes('/closed')) {
		return navigateTo(localePath('/closed'));
	}
});
