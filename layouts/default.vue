<script setup lang="ts">
	import MyHeader from '~/components/layout/my-header/index.vue';
	import Sidebar from '~/components/layout/my-sidebar/index.vue';
	import Toast from '~/components/shared/Toast.vue';

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
		const defaultTitle = 'ESP Sensors Analyzer';

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

	// Toasts
	const { toasts, addToast, removeToast } = useToasts();

	// Providers
	provide('openMySidebar', openMySidebar);
	provide('closeMySidebar', closeMySidebar);

	provide('addToast', addToast);
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
				<Sidebar ref="my-sidebar" :is-active="isMySidebar" />

				<Teleport to="#teleports">
					<TransitionGroup name="toasts">
						<Toast
							v-for="toast in toasts"
							:key="toast.id || generateRandomString()"
							:toast="toast"
							@kill-toast="removeToast(toast.id)"
						/>
					</TransitionGroup>
				</Teleport>
			</Body>
		</Html>
	</div>
</template>

<style scoped>
	.toasts-enter-from,
	.toasts-leave-to {
		left: 50%;
		transform: translate(-50%, -1rem);
		opacity: 0;
	}

	.toasts-enter-to,
	.toasts-leave-from {
		left: 50%;
		transform: translate(-50%, 0.5rem);
		opacity: 1;
	}

	.toasts-enter-active,
	.toasts-leave-active {
		transition:
			transform 0.3s ease,
			opacity 0.3s ease;
	}
</style>
