import type IBaseGasGroupedByType from './IBaseGasGroupedByType';

export default interface IGasGroupedByType
	extends Omit<IBaseGasGroupedByType, 'values'> {
	values: {
		value: number;
		timestamp: Date;
	}[];
}
