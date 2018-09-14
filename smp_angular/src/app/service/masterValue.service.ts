import { Injectable,Injector } from '@angular/core';
import { environment } from '../../environments/environment';

import { ModelCommonValues } from '../models/modelCommonValues';
import { ModelJsonResult } from '../models/modelJsonResult';
import { HttpAccessService } from './httpAccess.service';

@Injectable()
export class MasterValueService {
     
    private _http:HttpAccessService;
    private injector: Injector;
    private get http() { 
        if(this._http==null)
        {
            this._http = this.injector.get(HttpAccessService);
        }
        return this._http;
    }


    constructor(injector: Injector) { 
        this.injector = injector;
    }

    private static typeMap : Map<string, Map<string, string>> = new Map<string, Map<string, string>>();
    private static getMap :Map<string,boolean> = new Map<string,boolean>();
    private initType(type:string)
    {
        if(MasterValueService.typeMap.has(type))
        {
            return;
        }

        if(MasterValueService.getMap.has(type) && MasterValueService.getMap.get(type) === false)
        {
            return;
        }
        MasterValueService.getMap.set(type,false);

        const body = 
        {
          "type":type
        };
  
        const func =(function(response) {
           
            let result = response.body;
            let list = new Map<string, string>();

            for (let i=0; result.modelResult.length > i ;i++) {
                let element:ModelCommonValues = result.modelResult[i];
                let key: string = ''+ element.keyValue ;
                list.set(key,element.valueText);
            }

            MasterValueService.typeMap.set(type,list);
            MasterValueService.getMap.set(type,true); 
        });
        this.http.postAuthApp(func,body,'api/common/getCommonTypeGroup');
        
    }


    public getTypes():Map<string, string>
    {
        return this.getCommon("1");
    }

    public getCategories(type:string):Map<string, string>
    {
        return this.getCommon(type);
    }

    private getCommon(type:string):Map<string, string>
    {
        if(type === "")
        {
            return new Map<string, string>();
        }
        
        this.initType(type);

        if(MasterValueService.typeMap.has(type))
        {
            return MasterValueService.typeMap.get(type);
        }

        return new Map<string, string>();
    }
}