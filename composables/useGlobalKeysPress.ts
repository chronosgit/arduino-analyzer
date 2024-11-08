export default function () {
	const onDocumentKeyPress = (e: KeyboardEvent) => {
		const isCtrl = e.ctrlKey;
		const key = e.key;

		// Toggle color theme
		if (isCtrl && key === 'q') {
			const { $toggleMode } = useNuxtApp();

			$toggleMode();
		}
	};

	onMounted(() => {
		window.addEventListener('keydown', onDocumentKeyPress);
	});

	onBeforeMount(() => {
		window.removeEventListener('keydown', onDocumentKeyPress);
	});
}
