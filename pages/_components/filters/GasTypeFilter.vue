<script setup lang="ts">
	import type { TGasType } from '~/interfaces/features/gas/TGasType';

	const gasFilterByType = inject<Ref<TGasType | null> | undefined>(
		'gasFilterByType',
		undefined,
	);

	const onSelectChange = (e: Event) => {
		if (!e || gasFilterByType == null) return;

		const target = e.target as HTMLSelectElement | null;
		if (!target) return;

		gasFilterByType.value = target.value as TGasType;
	};
</script>

<template>
	<select
		:value="gasFilterByType"
		class="bg-zinc-200 p-1"
		@change="onSelectChange($event)"
	>
		<option disabled :selected="gasFilterByType === null">
			{{ $t('pages./.filters.gas.filter-by-name-option-disabled') }}
		</option>

		<option
			v-for="(t, i) in constants['gasTypes']"
			:key="i"
			:value="t"
			:selected="gasFilterByType === t"
		>
			{{ $t(`dictionary.${t}`) }}
		</option>
	</select>
</template>
