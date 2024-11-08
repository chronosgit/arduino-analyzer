export default function () {
	const onDocumentKeyPress = (e: KeyboardEvent) => {
		const isCtrl = e.ctrlKey;
		const key = e.key;

		// Toggle color theme
		if (isCtrl && key === 'q') {
			const { $isDarkMode, $toggleMode } = useNuxtApp();

			// WARN: for debug purposes
			console.log('Dark mode value before the change: ', $isDarkMode.value);

			$toggleMode();
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
