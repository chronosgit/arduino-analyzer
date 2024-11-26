<script setup lang="ts">
	import GasTypeFilter from './GasTypeFilter.vue';
	import PaginationInput from './PaginationInput.vue';

	const gasOffset = inject<Ref<number> | undefined>('gasOffset', undefined);
	const gasLimit = inject<Ref<number> | undefined>('gasLimit', undefined);

	const onPaginationInput = (e: Event) => {
		if (!e) throw createError('Event should be valid Event');

		const target = e.target as HTMLSelectElement | null;
		if (!target) throw createError('Event target is undefined');

		const newValue = parseInt(target.value);

		if (Number.isNaN(newValue) || newValue == null) {
			throw createError('Input valies is not parseable to a number');
		}

		return newValue;
	};

	const onGasOffsetChange = (e: Event) => {
		if (!gasOffset) return;

		try {
			const newValue = onPaginationInput(e);

			gasOffset.value = newValue;
		} catch (err) {
			console.error(err);
		}
	};

	const onGasLimitChange = (e: Event) => {
		if (!gasLimit) return;

		try {
			const newValue = onPaginationInput(e);

			gasLimit.value = newValue;
		} catch (err) {
			console.error(err);
		}
	};
</script>

<template>
	<div class="flex items-center gap-4">
		<GasTypeFilter />

		<PaginationInput
			v-if="gasOffset != null"
			:value="gasOffset.toString()"
			:label="$t('pages./.filters.gas.gas-offset', 'Gas offset')"
			placeholder="0"
			@change="onGasOffsetChange"
		/>

		<PaginationInput
			v-if="gasLimit != null"
			:value="gasLimit.toString()"
			:label="$t('pages./.filters.gas.gas-limit', 'Gas limit')"
			placeholder="50"
			@change="onGasLimitChange"
		/>
	</div>
</template>
