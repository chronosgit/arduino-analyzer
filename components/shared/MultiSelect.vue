<script setup lang="ts">
	import SelectBox from '~/components/ui/SelectBox.vue';

	const props = defineProps<{
		options: { name: string; label: string; isSelected: boolean }[];
	}>();
</script>

<template>
	<div class="">
		<div v-for="o in props.options" :key="o.name" class="">
			<p>{{ o.label }}</p>

			<SelectBox :is-selected="o.isSelected" />
		</div>
	</div>
</template>
