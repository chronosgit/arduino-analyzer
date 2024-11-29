<script setup lang="ts">
	import EspStateHeading from './_components/esp/StateHeading.vue';
	import DbStateHeading from './_components/db/StateHeading.vue';
	import GasSection from './_components/gas/Section.vue';
	import TemperatureSection from './_components/temperature/Section.vue';

	const { t } = useI18n();

	useHead({ title: t('pages./.meta.title') });
</script>

<template>
	<div class="px-2 pb-36 pt-8 min-h-screen dark:bg-zinc-900">
		<div class="container pb-12 mx-auto space-y-20">
			<div class="space-y-2">
				<EspStateHeading />

				<DbStateHeading />
			</div>

			<GasSection />

			<TemperatureSection />
		</div>
	</div>
</template>
