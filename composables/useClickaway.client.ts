export default function (elTemplateRefKey: string, onClickaway?: () => void) {
	const elTemplateRef = useTemplateRef(elTemplateRefKey) as Ref<
		HTMLElement | ComponentPublicInstance | null
	>;

	const onDocumentClick = (e: MouseEvent) => {
		const root = elTemplateRef.value;
		const clickTarget = e.target as HTMLElement;

		if (!root || !clickTarget) return;

		const rootDomEl: HTMLElement | null =
			root instanceof HTMLElement ? root : root.$el;

		if (!rootDomEl || rootDomEl.contains(clickTarget)) return;

		// Clickaway is valid

		if (typeof onClickaway === 'function') onClickaway();
	};

	onMounted(() => {
		document.addEventListener('mousedown', onDocumentClick);
	});

	onBeforeMount(() => {
		document.removeEventListener('mousedown', onDocumentClick);
	});
}
