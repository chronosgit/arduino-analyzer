<script setup lang="ts">
	import {
		IconCheck,
		IconClose,
		IconError,
		IconWarning,
	} from '~/components/ui/icons';
	import type IToast from '~/interfaces/features/toasts/IToast';

	const IconAwesome = defineAsyncComponent(
		() => import('~/components/ui/icons/Awesome.vue'),
	);

	const props = defineProps<{ toast: IToast }>();
	const emit = defineEmits<{ (e: 'killToast'): void }>();

	const isAlive = ref(true);

	const icon = computed(() => {
		switch (props.toast.type) {
			case 'success':
				return IconCheck;
			case 'warning':
				return IconWarning;
			case 'error':
				return IconError;
			default:
				return IconAwesome;
		}
	});

	const bgClr = computed(() => {
		switch (props.toast.type) {
			case 'success':
				return 'bg-green-400 ';
			case 'warning':
				return 'bg-yellow-500';
			case 'error':
				return 'bg-red-400';
			default:
				return 'bg-blue-300';
		}
	});

	onMounted(() => {
		setTimeout(() => {
			isAlive.value = false;

			emit('killToast');
		}, props.toast.lifespan);
	});
</script>

<template>
	<div
		v-if="isAlive"
		class="z-50 rounded-lg p-2 absolute top-0 translate-y-2 left-1/2 -translate-x-1/2 flex items-center gap-8"
		:class="bgClr"
	>
		<div class="flex items-center gap-2">
			<LazyClientOnly>
				<component :is="icon" class="scale-125" />
			</LazyClientOnly>

			<p class="font-medium">{{ props.toast.message }}</p>
		</div>

		<button class="flex items-center justify-center" @click="emit('killToast')">
			<ClientOnly>
				<IconClose class="scale-150" />
			</ClientOnly>
		</button>
	</div>
</template>
