import { Injectable,Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { ModelCommonValues } from '../models/modelCommonValues';
import { ModelJsonResult } from '../models/modelJsonResult';

//Todo 未使用　削除予定
@Injectable()
export class ManageMaster {
     
    static typeMap : Map<string, Map<string, string>> = new Map<string, Map<string, string>>();
    static getMap :Map<string,boolean> = new Map<string,boolean>();
    static initType(type:string,http:HttpClient)
    {
        if(this.typeMap.has(type))
        {
            return;
        }

        if(this.getMap.has(type) && this.getMap.get(type) === false)
        {
            return;
        }
        this.getMap.set(type,false);

        let body = 
        {
          "type":type
        };
  
        let self = this;

        http.post<ModelJsonResult>
            (environment.parentPath + 'api/common/getCommonTypeGroup' + environment.endPath 
                ,body)
        // subscribeの時点でModelEvent[]として受け取れる
        .subscribe(
            response => {
                let list = new Map<string, string>();
  
                for (let i=0; response.modelResult.length > i ;i++) {
                    let element:ModelCommonValues = response.modelResult[i];
                    let key: string = ''+ element.keyValue ;
                    list.set(key,element.valueText);
                }
  
                self.typeMap.set(type,list);
                self.getMap.set(type,true);
            },
        );
    }

    // static types : any = null;
    // static categories : any;
    // static subCategories : any;

//    static categoryMap = new Map<string, Map<string, string>>();

    static initType2(type:string)
    {
        if(type == "1"){
            let list = new Map<string, string>();
            list.set("12" , "所得");
            list.set("13" , "資産・引出金");
            list.set("14" , "借金");
            this.typeMap.set(type,list);

        } else if(type == "2")
        {
            let list = new Map<string, string>();
            list.set("1" , "食費");
            list.set("2" , "住居費");
            list.set("3" , "水道光熱費");
            list.set("4" , "教育費");
            list.set("5" , "教養・娯楽費");
            list.set("6" , "交通・通信費");
            list.set("7" , "医療・衛生費");
            list.set("8" , "交際費");
            list.set("9" , "車両費");
            list.set("10" , "社会保険料");
            list.set("15" , "税金");
            list.set("11" , "特別費");
            this.typeMap.set(type,list);
        }
    }

    static getTypes(http:HttpClient):Map<string, string>
    {
        return this.getCommon("3",http);
    }

    static getCategories(type:string,http:HttpClient):Map<string, string>
    {
        return this.getCommon(type,http);
    }

    static getCommon(type:string,http:HttpClient):Map<string, string>
    {
        if(type === "")
        {
            return new Map<string, string>();
        }
        
        this.initType(type,http);

        if(this.typeMap.has(type))
        {
            return this.typeMap.get(type);
        }

        return new Map<string, string>();
    }
}