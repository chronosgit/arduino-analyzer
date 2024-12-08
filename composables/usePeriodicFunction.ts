// eslint-disable-next-line
export default function (callback: () => any, intervalTime = 3000) {
	const timer = ref<ReturnType<typeof setInterval> | null>(null);

	onMounted(() => {
		timer.value = setInterval(() => {
			if (typeof callback === 'function') callback();
		}, intervalTime);
	});

	onUnmounted(() => {
		if (timer.value) {
			clearInterval(timer.value);
		}
	});
}
