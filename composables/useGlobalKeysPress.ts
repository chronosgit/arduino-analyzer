export default function () {
	const switchLocale = useSwitchLocale();

	const lastExecutionTime = ref(0);

	const onDocumentKeyPress = (e: KeyboardEvent) => {
		const isCtrl = e.ctrlKey;
		const key = e.key;

		const now = Date.now();

		if (now - lastExecutionTime.value <= 300) return;

		lastExecutionTime.value = now;

		// Toggle color theme
		if (isCtrl && key === 'q') {
			const { $toggleMode } = useNuxtApp();

			$toggleMode();
		}
		// Localization
		else if (isCtrl && key === 'z') {
			switchLocale();
		}
	};

	const onWindowVisChange = () => {
		if (document.visibilityState === 'visible') {
			window.focus();
		}
	};

	onMounted(() => {
		window.addEventListener('keydown', onDocumentKeyPress);
		document.addEventListener('visibilitychange', onWindowVisChange);
	});

	onBeforeMount(() => {
		window.removeEventListener('keydown', onDocumentKeyPress);
		document.removeEventListener('visibilitychange', onWindowVisChange);
	});
}
