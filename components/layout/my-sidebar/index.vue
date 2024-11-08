<script setup lang="ts">
	import {
		IconExit,
		IconLocalization,
		IconMoonWithCloud,
		IconSunWithClouds,
	} from '~/components/ui/icons';
	import Feature from './_components/Feature.vue';
	import Header from './_components/Header.vue';
	import { useCurSessionStore } from '~/store/useCurSessionStore';

	const { $isDarkMode, $toggleMode } = useNuxtApp();

	const curSessionStore = useCurSessionStore();

	const props = defineProps<{ isActive: boolean }>();

	const switchLocale = useSwitchLocale();
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

		<!-- Features -->
		<div class="space-y-4 mb-8">
			<Feature @click="$toggleMode">
				<template #icon>
					<IconMoonWithCloud v-if="$isDarkMode" class="scale-125" />
					<IconSunWithClouds v-else class="scale-125" />
				</template>

				{{ $t('comps.layout.my-sidebar.features.color-theme') }}
			</Feature>

			<Feature @click="switchLocale">
				<template #icon>
					<IconLocalization class="scale-150" />
				</template>

				{{ $t('comps.layout.my-sidebar.features.localization') }}
			</Feature>
		</div>

		<!-- Logout -->
		<Feature @click="curSessionStore.closeSession">
			<template #icon>
				<IconExit class="scale-150" />
			</template>

			{{ $t('comps.layout.my-sidebar.features.logout') }}
		</Feature>
	</aside>
</template>

<script lang="ts">
	export default {
		name: 'LayoutMySidebar',
	};
</script>
