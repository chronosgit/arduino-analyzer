<script setup lang="ts">
	import IconColorsWrapper from '~/components/ui/IconColorsWrapper.vue';
	import { IconBurger } from '~/components/ui/icons';

	const openMySidebar = inject<() => void>('openMySidebar', () => {
		console.log('Injected openMySidebar is undefined');
	});
</script>

<template>
	<header class="p-2 dark:bg-zinc-900">
		<ClientOnly>
			<button @click="openMySidebar">
				<IconColorsWrapper>
					<IconBurger class="scale-150" />
				</IconColorsWrapper>
			</button>
		</ClientOnly>
	</header>
</template>

<script lang="ts">
	export default {
		name: 'LayoutMyHeader',
	};
</script>
