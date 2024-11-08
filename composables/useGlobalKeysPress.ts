export default function () {
	const { locale, availableLocales, setLocale } = useI18n();

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
		// Localization
		else if (isCtrl && key === 'z') {
			const curLocaleInd = availableLocales.findIndex(
				(l) => l === locale.value,
			);

			const indOfNextLocale =
				curLocaleInd + 1 >= availableLocales.length ? 0 : curLocaleInd + 1;

			setLocale(availableLocales[indOfNextLocale]);
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
