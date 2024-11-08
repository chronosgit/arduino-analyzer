<script setup lang="ts">
	import {
		IconLocalization,
		IconMoonWithCloud,
		IconSunWithClouds,
	} from '~/components/ui/icons';
	import Feature from './_components/Feature.vue';
	import Header from './_components/Header.vue';

	const { $isDarkMode, $toggleMode } = useNuxtApp();

	const props = defineProps<{ isActive: boolean }>();
</script>

<template>
	<aside
		class="dark:border-r-zinc-700 border-r-[1px] dark:bg-zinc-900 bg-white min-w-[30%] fixed left-0 top-0 p-2 transition-transform bottom-0"
		:class="{
			'translate-x-0': props.isActive,
			'-translate-x-full': !props.isActive,
		}"
	>
		<Header class="mb-10" />

		<div class="space-y-4">
			<Feature @click="$toggleMode">
				<template #icon>
					<IconMoonWithCloud v-if="$isDarkMode" class="scale-125" />
					<IconSunWithClouds v-else class="scale-125" />
				</template>

				{{ $t('comps.layout.my-sidebar.features.color-theme') }}
			</Feature>

			<Feature>
				<template #icon>
					<IconLocalization class="scale-150" />
				</template>

				{{ $t('comps.layout.my-sidebar.features.localization') }}
			</Feature>
		</div>
	</aside>
</template>

<script lang="ts">
	export default {
		name: 'LayoutMySidebar',
	};
</script>
