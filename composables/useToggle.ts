export default function (initVal?: boolean) {
	const val = ref(initVal ?? false);

	const activate = () => (val.value = true);

	const disactivate = () => (val.value = false);

	const toggle = () => (val.value = !val.value);

	return { val, activate, disactivate, toggle };
}
