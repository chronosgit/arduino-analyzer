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
	<div class="flex gap-2 items-center">
		<p class="dark:text-white">
			{{ $t('pages./.filters.gas.filter-by-name-option-disabled') }}:
		</p>

		<select
			:value="gasFilterByType"
			class="bg-zinc-200"
			@change="onSelectChange($event)"
		>
			<option disabled>
				{{ $t('pages./.filters.gas.filter-by-name-option-disabled') }}
			</option>

			<option v-for="(t, i) in constants['gasTypes']" :key="i" :value="t">
				{{ $t(`dictionary.${t}`) }}
			</option>
		</select>
	</div>
</template>
