import type { TGasType } from './TGasType';

export default interface IGas {
	_id: string;
	type: TGasType;
	value: number;
	timestamp: Date; // or string?
}
