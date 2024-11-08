<script setup lang="ts">
	import CloseMySidebarBtn from './_components/CloseMySidebarBtn.vue';

	const props = defineProps<{ isActive: boolean }>();
	const emit = defineEmits<{ (e: 'closeMySidebar'): void }>();
</script>

<template>
	<aside
		class="pt-6 min-w-[30%] fixed left-0 top-0 px-5 transition-transform bottom-0 dark:bg-zinc-950 bg-zinc-300"
		:class="{
			'translate-x-0': props.isActive,
			'-translate-x-full': !props.isActive,
		}"
	>
		<!-- Snapped to top-right corner -->
		<CloseMySidebarBtn @click="emit('closeMySidebar')" />
	</aside>
</template>

<script lang="ts">
	export default {
		name: 'LayoutMySidebar',
	};
</script>
