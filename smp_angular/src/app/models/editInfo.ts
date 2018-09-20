
/**
 * 編集情報格納
 *
 * @export
 * @class EditInfo
 */
export class EditInfo {
    id: number;
    editMode: number;

    
    /**
     * 編集情報名取得処理
     *
     * @returns {string}
     * @memberof EditInfo
     */
    getEditName():string{
      var ret = "";
      switch(this.editMode)
      {
        case 1:
          ret = "追加";
          break;
        case 2:
          ret = "更新";
          break;
        default:
          ret = "追加";
          break;
      }

      return ret;
    }
}