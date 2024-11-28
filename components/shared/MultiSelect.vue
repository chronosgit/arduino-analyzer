<script setup lang="ts">
	import SelectBox from '~/components/ui/SelectBox.vue';
	import { useGasStore } from '~/store/useGasStore';
	import type IGasFilterState from '~/interfaces/features/gas/IGasFilterState';

	const props = defineProps<{
		options: IGasFilterState[];
	}>();

	const gasStore = useGasStore();
</script>

<template>
	<div class="">
		<div
			v-for="o in props.options"
			:key="o.name"
			:data-type="o.name"
			class="flex gap-1 space-y-1 items-center cursor-pointer"
			@click="gasStore.toggleFilterByType"
		>
			<SelectBox :is-selected="o.isSelected" />

			<p class="w-full">
				{{ o.label || capitalize(o.name) }}
			</p>
		</div>
	</div>
</template>
