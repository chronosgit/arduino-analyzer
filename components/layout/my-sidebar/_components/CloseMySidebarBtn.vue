<script setup lang="ts">
	import IconColorsWrapper from '~/components/ui/IconColorsWrapper.vue';
	import { IconClose } from '~/components/ui/icons';

	const closeMySidebar = inject<() => void>('closeMySidebar', () => {});
</script>

<template>
	<ClientOnly>
		<button @click="closeMySidebar">
			<IconColorsWrapper>
				<IconClose class="scale-150" />
			</IconColorsWrapper>
		</button>
	</ClientOnly>
</template>
