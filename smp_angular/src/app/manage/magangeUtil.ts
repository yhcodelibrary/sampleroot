
/**
 * 汎用処理クラス
 *
 * @export
 * @class ManageUtil
 */
export class ManageUtil {

    /**
     * 日付型を文字型にして戻す
     *
     * @static
     * @param {Date} target
     * @returns {string}
     * @memberof ManageUtil
     */
    public static convertDateToString(target:Date):string
    {
        if(target == null || target == undefined)
        {
            return "";
        }

        return target.getFullYear() 
        + "/" 
        + ('0' + (target.getMonth() + 1)).slice(-2)
        + "/" 
        + ('0' + target.getDate()).slice(-2)
        ;
    }

    /**
     * 文字を日付型に変換する
     *
     * @static
     * @param {string} target
     * @returns {Date}
     * @memberof ManageUtil
     */
    public static convertStringToDate(target:string):Date
    {
        if(target == "")
        {
            return null;
        }
        return new Date(target);
    }
}