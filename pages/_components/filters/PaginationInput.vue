<script setup lang="ts">
	const props = defineProps<{
		value: string;
		label: string;
		placeholder: string;
	}>();
	const emit = defineEmits<{ (e: 'change', event: Event): void }>();
</script>

<template>
	<div class="flex items-center gap-2">
		<label for="input" class="dark:text-white"> {{ props.label }}: </label>

		<input
			id="input"
			:value="props.value"
			type="text"
			class="px-1 w-max min-w-4 bg-zinc-200"
			:placeholder="props.placeholder"
			@change="emit('change', $event)"
		>
	</div>
</template>
