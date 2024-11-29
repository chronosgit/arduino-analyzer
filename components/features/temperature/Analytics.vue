<script setup lang="ts">
	const props = defineProps<{ meanTemperature: number; sampleSize: number }>();
</script>

<template>
	<div
		v-if="props.meanTemperature != null && props.sampleSize != null"
		class="flex flex-col items-center gap-4 rounded-full"
	>
		<p class="text-center dark:text-white">
			{{
				$t('comps.features.temperature.analytics.label', 'Average temperature')
			}}:
		</p>

		<p class="text-4xl dark:text-white">
			{{ props.meanTemperature }}<sup>°C</sup>
		</p>
	</div>
</template>
