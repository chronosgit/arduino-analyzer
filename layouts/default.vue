<script setup lang="ts">
	import MyHeader from '~/components/layout/my-header/index.vue';
	import Sidebar from '~/components/layout/my-sidebar/index.vue';

	const route = useRoute();
	const { t, te } = useI18n();

	const head = useLocaleHead({
		addDirAttribute: true,
		identifierAttribute: 'id',
		addSeoAttributes: true,
	});

	// Localization-based title
	const title = computed(() => {
		const customTitle = route.meta.title as string | undefined;
		const defaultTitle = 'Arduino Analyzer';

		if (!customTitle) return defaultTitle;

		return te(customTitle) ? t(customTitle) : defaultTitle;
	});

	useGlobalKeysPress();

	// Sidebar
	const {
		val: isMySidebar,
		activate: openMySidebar,
		disactivate: closeMySidebar,
	} = useToggle();
	useClickawayClient('my-sidebar', closeMySidebar);

	// Providers
	provide('openMySidebar', openMySidebar);
	provide('closeMySidebar', closeMySidebar);
</script>

<template>
	<div>
		<Html :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir">
			<Head>
				<Title>{{ title }}</Title>

				<template v-for="link in head.link" :key="link.id">
					<Link
						:id="link.id"
						:rel="link.rel"
						:href="link.href"
						:hreflang="link.hreflang"
					/>
				</template>

				<template v-for="meta in head.meta" :key="meta.id">
					<Meta
						:id="meta.id"
						:property="meta.property"
						:content="meta.content"
					/>
				</template>
			</Head>

			<Body class="h-screen overflow-x-hidden">
				<MyHeader />

				<slot />

				<!-- Absolutes -->
				<Sidebar
					ref="my-sidebar"
					:is-active="isMySidebar"
					@close-my-sidebar="closeMySidebar"
				/>
			</Body>
		</Html>
	</div>
</template>
