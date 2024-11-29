<script setup lang="ts">
	import SelectBox from '~/components/ui/SelectBox.vue';
	import type ISelectOption from '~/interfaces/ISelectOption';

	const props = defineProps<{
		options: ISelectOption<string>[];
	}>();
	const emit = defineEmits<{
		(e: 'onSelect', selectedValue: string): unknown;
	}>();

	const onFilterClick = (selectOptionName: string) => {
		emit('onSelect', selectOptionName);
	};
</script>

<template>
	<div class="">
		<div
			v-for="o in props.options"
			:key="o.label"
			:data-type="o.name"
			class="flex gap-1 space-y-1 items-center cursor-pointer"
			@click="onFilterClick(o.name)"
		>
			<SelectBox :is-selected="o.isSelected" />

			<p class="w-full">
				{{
					o.label || capitalize(typeof o.name === 'string' ? o.name : 'Label')
				}}
			</p>
		</div>
	</div>
</template>
