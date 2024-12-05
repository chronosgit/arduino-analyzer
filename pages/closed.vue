<script setup lang="ts">
	import { useCurSessionStore } from '~/store/useCurSessionStore';
	import type { FAddToast } from '~/interfaces/features/toasts/FAddToasts';

	const localePath = useLocalePath();
	const { t } = useI18n();

	useHead({ title: t('pages./closed.meta.title') });

	const addToast = inject<FAddToast>('addToast', () => {});

	const curSessionStore = useCurSessionStore();

	const input = ref('');

	const connectWithEsp = () => {
		if (!verifyIPv4Address(input.value)) {
			addToast({
				id: generateRandomString(),
				type: 'error',
				message: t('pages./closed.toasts.invalid-ipv4'),
				lifespan: 3000,
			});

			return;
		}

		curSessionStore.startSession(input.value);

		navigateTo(localePath('/'));
	};

	const connectWithoutEsp = () => {
		curSessionStore.startSession(input.value);

		navigateTo(localePath('/'));
	};
</script>

<template>
	<section
		class="px-2 dark:bg-zinc-900 gap-8 h-screen flex-col flex justify-center items-center"
	>
		<h1 class="dark:text-white font-bold text-3xl text-center">
			{{ $t('pages./closed.h1') }}
		</h1>

		<form
			class="flex flex-col xs:flex-row items-center gap-3"
			@submit.prevent="connectWithEsp"
		>
			<!-- eslint-disable-next-line-->
			<input
				v-model="input"
				type="text"
				class="dark:bg-zinc-700 bg-zinc-100 p-2 dark:text-white rounded-md border-[1px] dark:border-zinc-700 border-zinc-100 outline-none focus:border-indigo-500"
				:placeholder="t('pages./closed.input-placeholder')"
				required
			/>

			<button
				class="transition-colors hover:bg-indigo-600 bg-indigo-500 py-2 px-4 rounded-full text-white font-medium"
			>
				{{ $t('pages./closed.btns.connect-with-esp', 'Connect') }}
			</button>
		</form>

		<button
			class="transition-colors hover:bg-violet-600 bg-violet-500 py-2 px-4 rounded-full text-white font-medium"
			@click="connectWithoutEsp"
		>
			{{ $t('pages./closed.btns.connect-without-esp', 'Connect') }}
		</button>
	</section>
</template>
