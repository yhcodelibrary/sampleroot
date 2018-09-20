import { cast, Castable } from '@bitr/castable';

/**
 * 汎用値テーブルモデル
 *
 * @export
 * @class ModelCommonValues
 * @extends {Castable}
 */
export class ModelCommonValues extends Castable {
    
    @cast commonValueType:string;
    @cast keyValue:string;
    @cast valueText:string;
}