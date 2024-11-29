<script setup lang="ts">
	import { IconPause, IconResume, IconSettings } from '~/components/ui/icons';

	const props = defineProps<{ isFetchingFromDbOn: boolean }>();
	const emit = defineEmits<{
		(e: 'pause' | 'resume'): void;
	}>();

	const {
		val: isFiltersVisible,
		activate: openFilters,
		disactivate: closeFilters,
	} = useToggle();
	useClickawayClient('filters', closeFilters);
</script>

<template>
	<div class="flex gap-3 items-center">
		<ClientOnly v-if="props.isFetchingFromDbOn != null">
			<button
				v-if="props.isFetchingFromDbOn"
				class="flex justify-center items-center"
				@click="emit('pause')"
			>
				<IconPause
					v-if="props.isFetchingFromDbOn"
					class="scale-125 text-red-600 hover:text-zinc-400 transition-colors"
				/>
			</button>

			<button
				v-else
				class="flex justify-center items-center"
				@click="emit('resume')"
			>
				<IconResume
					class="scale-150 text-green-500 hover:text-zinc-400 transition-colors"
				/>
			</button>
		</ClientOnly>

		<ClientOnly>
			<IconSettings
				class="hover:text-indigo-500 transition-colors scale-125 cursor-pointer dark:text-white"
				@click="openFilters"
			/>

			<div
				v-if="isFiltersVisible"
				ref="filters"
				class="shadow-md z-50 absolute right-0 top-0 translate-y-8"
			>
				<slot name="filters" />
			</div>
		</ClientOnly>
	</div>
</template>
