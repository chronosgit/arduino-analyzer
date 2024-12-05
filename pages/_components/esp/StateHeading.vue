<script setup lang="ts">
	import { IconInfo } from '~/components/ui/icons';
	import useEsp from '~/composables/features/esp/useEsp';
	import useEspGas from '~/composables/features/esp/useEspGas';

	const { t } = useI18n();

	const { isEspAlive } = useEsp();
	useEspGas();
	// useEspTemperature();

	const headingMsg = computed(() => {
		switch (isEspAlive.value) {
			case true:
				return t('pages./.esp-state-heading.msg.true', 'ESP is connected');
			case false:
				return t('pages./.esp-state-heading.msg.false', 'ESP is disconnected');
			default:
				return t(
					'pages./.esp-state-heading.msg.rest',
					'ESP connection state is unknown',
				);
		}
	});

	const style = computed(() => {
		switch (isEspAlive.value) {
			case true:
				return 'bg-green-400 dark:bg-green-900 dark:text-white';
			case false:
				return 'bg-red-300 dark:bg-red-800 dark:text-white';
			default:
				return 'dark:bg-zinc-700 dark:text-white bg-zinc-300';
		}
	});
</script>

<template>
	<div class="rounded-lg px-4 py-2 flex gap-2 items-center" :class="style">
		<LazyClientOnly>
			<IconInfo class="scale-125 shrink-0" />
		</LazyClientOnly>

		<p class="text-sm 2xs:text-base">{{ headingMsg }}</p>
	</div>
</template>
