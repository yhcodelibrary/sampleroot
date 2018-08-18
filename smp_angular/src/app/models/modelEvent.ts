
//定義型読み込み
import { ManageUtil } from '../manage/magangeUtil';
import { ManageMaster } from '../manage/manageMaster';

export class ModelEvent {
    eventId:number;
    type:string;
    category:string;
    subCategory:string;

    detail:string;
    note:string;
    eventDate: Date;
    
    ssVersion:string;
    //eventDateString: string;

    set eventDateString(date: string) {
        this.eventDate = ManageUtil.convertStringToDate(date);
    }
    get eventDateString() { return ManageUtil.convertDateToString(this.eventDate); }

    // public getTypeName():string
    // {
    //     let list = ManageMaster.getTypes();
    //     if(list.has(this.type))
    //     {
    //         return list.get(this.type);
    //     }
    //     return "";
    // }

    // public getCategoryName():string
    // {
    //     let list = ManageMaster.getCategories(this.type);
    //     if(list.has(this.category))
    //     {
    //         return list.get(this.category);
    //     }
    //     return "";
    // }

    // public getSubCategoryName():string
    // {
    //     let list = ManageMaster.getSubCategories(this.category);
    //     if(list.has(this.subCategory))
    //     {
    //         return list.get(this.subCategory);
    //     }
    //     return "";
    // }
    public clone():ModelEvent{
        
        let tmp = new ModelEvent();
        ModelEvent.common(this,tmp);
        tmp.eventDate = this.eventDate;
        
        return tmp;
    }
    public reflect(tmp)
    {
        ModelEvent.common(tmp,this);
        this.eventDate = tmp.eventDate;
        tmp.eventDate = ManageUtil.convertStringToDate(tmp.eventDate);

    }
    public requestObject()
    {
        let req:any = new Object();
        ModelEvent.common(this,req);
        req.eventDate = ManageUtil.convertDateToString(this.eventDate);
        
        return req;
    }
    public static create(org)
    {
        let tmp = new ModelEvent();
        ModelEvent.common(org,tmp);
        tmp.eventDate = ManageUtil.convertStringToDate(org.eventDate);

        return tmp;
    }
    private static common(from,to)
    {
        to.eventId = from.eventId;
        to.type = from.type;
        to.detail = from.detail;
        to.category = from.category;
        to.subCategory = from.subCategory;
        to.detail= from.detail;
        to.note = from.note;
        to.ssVersion = from.ssVersion;
    }
}