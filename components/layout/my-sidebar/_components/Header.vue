<script setup lang="ts">
	import CloseMySidebarBtn from './CloseMySidebarBtn.vue';
</script>

<template>
	<div class="flex justify-between items-center gap-1">
		<NuxtImg
			src="/images/logo-32x32.png"
			alt="logo"
			class="max-w-6 hover:grayscale-0 transition-all grayscale"
		/>

		<CloseMySidebarBtn />
	</div>
</template>
