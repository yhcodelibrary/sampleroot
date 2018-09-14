import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UnloginAccessError } from '../common-ts/UnloginAccessError';
import { ApplicationError } from '../common-ts/applicationError';

@Injectable()
export class HttpAccessService {

    http:HttpClient;
    injector: Injector;

    
    protected httpOptions = {
        observe: 'response' as 'response',
        withCredentials:true
    };

    constructor(injector: Injector) { 
        this.injector = injector;
    }

    public postAuthApp(funcSubs,body:any,url:string)
    {
     
        if(this.http == null)
        {
            this.http = this.injector.get(HttpClient);
        }

        this.http.post//<ModelEvent[]>
            (environment.parentPath + url + environment.endPath 
                ,body,this.httpOptions)
            .subscribe(
                response => {
                console.debug(response.body);

                funcSubs(response);

                },
                error => console.log("Error: " + error)
            );
 
    }

    
  protected getPostResult(response)
  {
//    this.isValid = true;
    switch(response.status)
    {
      //成功
      case 1:
        return response.modelResult;
      //バリデーションエラー
      case 2:
        // this.isValid = false;
        // this.valid = response.modelResult;
        break;
      //未ログイン
      case 9:
        throw new UnloginAccessError('unlogin');
        
      //異常終了
      case 99:
        throw new ApplicationError('managed server err');
      default:
        break;
    }
  }
}