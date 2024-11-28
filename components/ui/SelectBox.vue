<script setup lang="ts">
	const props = defineProps<{ isSelected: boolean }>();
</script>

<template>
	<div
		class="cursor-pointer border-zinc-400 transition-colors rounded-sm border-[1px] h-5 w-5"
		:class="{
			'bg-indigo-400 hover:bg-white dark:hover:bg-black': props.isSelected,
			'bg-none hover:bg-indigo-400': !props.isSelected,
		}"
	/>
</template>
