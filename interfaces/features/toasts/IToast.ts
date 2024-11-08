export type ToastType = 'error' | 'warning' | 'success';

export default interface IToast {
	id: string | number;
	type: ToastType;
	message: string | number;
	lifespan?: number; // ms
}
