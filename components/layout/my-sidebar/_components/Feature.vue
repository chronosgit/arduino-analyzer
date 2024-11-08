<script setup lang="ts">
	import IconColorsWrapper from '~/components/ui/IconColorsWrapper.vue';
</script>

<template>
	<div class="cursor-pointer group/feat flex items-center gap-2">
		<ClientOnly>
			<IconColorsWrapper
				class="group-hover/feat:text-indigo-500 dark:group-hover/feat:text-indigo-400"
			>
				<slot name="icon" />
			</IconColorsWrapper>
		</ClientOnly>

		<p
			class="transition group-hover/feat:text-indigo-500 dark:group-hover/feat:text-indigo-400 font-medium text-zinc-400"
		>
			<slot />
		</p>
	</div>
</template>
