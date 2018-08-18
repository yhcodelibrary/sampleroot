
export class ManageUtil {
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

    public static convertStringToDate(target:string):Date
    {
        if(target == "")
        {
            return null;
        }
        return new Date(target);
    }
}