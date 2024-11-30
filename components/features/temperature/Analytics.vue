<script setup lang="ts">
	const { t } = useI18n();

	const props = defineProps<{ meanTemperature: number; sampleSize: number }>();

	const label = computed(() => {
		const localeMsgKey = 'comps.features.temperature.analytics.label';
		const localeTxt = t(localeMsgKey, { cnt: props.sampleSize });

		if (localeTxt.includes(localeMsgKey)) {
			return t(localeMsgKey + '-default', 'Average temperature');
		}

		return localeTxt;
	});
</script>

<template>
	<div
		v-if="props.meanTemperature != null && props.sampleSize != null"
		class="flex flex-col items-center gap-4 rounded-full"
	>
		<p class="text-center dark:text-white text-lg">{{ label }}:</p>

		<p class="text-5xl font-medium dark:text-white">
			{{ props.meanTemperature }}<sup>°C</sup>
		</p>
	</div>
</template>
