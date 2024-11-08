<script setup lang="ts">
	import { IconClose } from '~/components/ui/icons';

	// Improved function to handle button click
	const onBtnClick = (attrs: { onClick?: () => void }) => {
		const fallthroughOnClick = attrs.onClick;

		if (!fallthroughOnClick) return;

		fallthroughOnClick();
	};
</script>

<template>
	<ClientOnly>
		<button
			class="flex justify-center items-center text-zinc-500 dark:hover:text-white transition-colors hover:text-black absolute top-0 right-0 -translate-x-1 translate-y-2"
			@click="onBtnClick($attrs)"
		>
			<IconClose class="scale-150" />
		</button>
	</ClientOnly>
</template>
