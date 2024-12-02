import type { TGasType } from './TGasType';

export default interface IGasGroupedByType {
	type: TGasType;
	values: {
		value: number;
		timestamp: Date;
	}[];
}
