
//定義型読み込み
import {ImportanceType} from '../common/enumDefine';

export class TodoInfo {
    id: number;
    title: string;
    detail: string;
    todoLocation: string;
    startDateTime: Date;
    endDateTime: Date;
    tags: string[];
    imp:ImportanceType;
    
    constructor(){
        
    }

    clone():TodoInfo{
        var tmp = new TodoInfo();
        tmp.id = this.id;
        tmp.title = this.title;
        tmp.detail = this.detail;
        tmp.todoLocation = this.todoLocation;
        tmp.startDateTime = this.startDateTime;
        tmp.endDateTime= this.endDateTime;
        tmp.imp = this.imp;

        return tmp;
    }    
    reflect(tmp:TodoInfo)
    {
        this.id = tmp.id;
        this.title = tmp.title;
        this.detail = tmp.detail;
        this.todoLocation = tmp.todoLocation;
        this.startDateTime = tmp.startDateTime;
        this.endDateTime= tmp.endDateTime;
        this.imp = tmp.imp;
    }
}