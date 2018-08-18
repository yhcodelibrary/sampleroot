import { cast, Castable } from '@bitr/castable';

export class ModelCommonValues extends Castable {
    
    @cast commonValueType:string;
    @cast keyValue:string;
    @cast valueText:string;
}