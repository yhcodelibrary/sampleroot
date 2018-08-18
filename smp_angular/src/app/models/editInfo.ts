
export class EditInfo {
    id: number;
    editMode: number;

    
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