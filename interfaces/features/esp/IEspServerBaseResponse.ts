export default interface IEspServerBaseResponse<T> {
	status?: boolean;
	message?: string;
	data?: T;
}
