<script setup lang="ts">
	import { IconIp } from '~/components/ui/icons';
	import { useCurSessionStore } from '~/store/useCurSessionStore';

	const curSessionStore = useCurSessionStore();
</script>

<template>
	<div
		class="absolute bottom-0 left-1/2 gap-2 -translate-x-1/2 flex items-center"
	>
		<LazyClientOnly>
			<IconIp class="scale-125 text-zinc-400" />
		</LazyClientOnly>

		<p class="text-zinc-400">{{ curSessionStore.arduinoEspIpAddress }}</p>
	</div>
</template>
