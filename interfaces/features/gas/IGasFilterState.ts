import type { TGasType } from '~/interfaces/features/gas/TGasType';

export default interface IGasFilterState {
	name: TGasType;
	label?: string;
	isSelected: boolean;
}
