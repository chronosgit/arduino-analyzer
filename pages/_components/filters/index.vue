<script setup lang="ts">
	import { IconFilter } from '~/components/ui/icons';
	import GasFilters from './GasFilters.vue';

	const clearGasOptions = inject<() => void>('clearGasOptions', () => {});
</script>

<template>
	<div class="flex gap-2">
		<LazyClientOnly>
			<IconFilter
				class="cursor-pointer scale-125 flex justify-center items-center dark:text-white"
				@click="clearGasOptions"
			/>
		</LazyClientOnly>

		<div class="">
			<GasFilters />
		</div>
	</div>
</template>
