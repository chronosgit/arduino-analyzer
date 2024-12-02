export default interface IBaseEspResponse<DataType> {
	status: boolean;
	message?: string;
	data?: DataType | null;
}
