import type IToast from '~/interfaces/features/toasts/IToast';

export default function () {
	const toasts = ref<IToast[]>([]);

	const addToast = (toast: IToast) => {
		if (!toast || !toast.id || !toast.message || !toast.lifespan) return;
		if (!['error', 'warning', 'success'].includes(toast.type)) return;

		toasts.value.push(toast);
	};

	const removeToast = (toastId: string | number) => {
		const theToastIndex = toasts.value.findIndex((t) => t.id === toastId);

		if (theToastIndex === -1) return;

		toasts.value.splice(theToastIndex, 1);
	};

	return { toasts, addToast, removeToast };
}
