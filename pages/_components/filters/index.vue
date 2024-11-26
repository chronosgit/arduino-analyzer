<script setup lang="ts">
	import { IconFilter } from '~/components/ui/icons';
	import GasFilters from './GasFilters.vue';

	const clearGasOptions = inject<() => void>('clearGasOptions', () => {});
</script>

<template>
	<div class="flex gap-8">
		<LazyClientOnly>
			<IconFilter
				class="cursor-pointer mt-1 scale-125 flex justify-center items-center dark:text-white"
				@click="clearGasOptions"
			/>
		</LazyClientOnly>

		<div class="bg-blue-50">
			<GasFilters />
		</div>
	</div>
</template>
