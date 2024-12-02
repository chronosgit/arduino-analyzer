import type { TGasType } from './TGasType';

export default interface IBaseGasGroupedByType {
	type: TGasType;
	values: number[];
}
