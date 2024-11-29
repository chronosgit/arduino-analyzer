<script setup lang="ts">
	import { IconInfo } from '~/components/ui/icons';

	const { t } = useI18n();

	const { isDbConnected, fetchDbConnectionStatus } = useDb();
	usePeriodicFunction(fetchDbConnectionStatus);

	const headingMsg = computed(() => {
		switch (isDbConnected.value) {
			case true:
				return t('pages./.db-state-heading.msg.true');
			case false:
				return t('pages./.db-state-heading.msg.false');
			default:
				return t('pages./.db-state-heading.msg.rest');
		}
	});

	const style = computed(() => {
		switch (isDbConnected.value) {
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
