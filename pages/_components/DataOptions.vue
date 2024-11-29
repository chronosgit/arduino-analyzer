<script setup lang="ts">
	import {
		IconPause,
		IconResume,
		IconSave,
		IconSettings,
	} from '~/components/ui/icons';

	const props = defineProps<{
		saveableElementTemplateRefs: Ref<HTMLElement | null>[];
		isFetchingFromDbOn: boolean;
	}>();
	const emit = defineEmits<{
		(e: 'pause' | 'resume'): void;
	}>();

	const { $isDarkMode } = useNuxtApp();

	const {
		val: isFiltersVisible,
		activate: openFilters,
		disactivate: closeFilters,
	} = useToggle();
	useClickawayClient('filters', closeFilters);

	const saveElementsAsImages = () => {
		if (props.saveableElementTemplateRefs == null) return;

		const htmlElements = props.saveableElementTemplateRefs
			.map((r) => r.value)
			.filter((h) => h != null);

		htmlElements.map((htmlEl) =>
			saveHtmlAsImage(htmlEl, $isDarkMode.value ? '#000' : '#fff'),
		);
	};
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

		<ClientOnly v-if="props.saveableElementTemplateRefs != null">
			<button
				class="flex justify-between items-center"
				@click="saveElementsAsImages"
			>
				<IconSave
					class="scale-125 transition-colors hover:text-indigo-500 dark:text-white"
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
