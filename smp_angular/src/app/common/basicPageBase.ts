import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModelValidation } from '../models/modelValidation';

import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { UnloginAccessError } from '../common-ts/UnloginAccessError';
import { ApplicationError } from '../common-ts/applicationError';
export class BasicPageBase implements OnInit {
  
  protected isValid:boolean;
  protected valid:ModelValidation;

  
  ngOnInit()
  {
    this.isValid = true;
    this.onInitPreLoad();
    this.onInitLoad();
    this.onInitLoadEnd();
  }

  onInitPreLoad(){}
  onInitLoad(){}
  onInitLoadEnd(){}

  constructor(protected http: HttpClient
    ,protected router: Router)
  {
    //最初に空のバリデーションオブジェクトを作成
    this.valid = new ModelValidation();
  }

  protected getPostResult(response)
  {
    this.isValid = true;
    switch(response.status)
    {
      //成功
      case 1:
        return response.modelResult;
      //バリデーションエラー
      case 2:
        this.isValid = false;
        this.valid = response.modelResult;
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

  protected getKeys(map){
    let arr =Array.from(map.keys());
    arr.unshift("");
    return arr;
  }

  protected isValidError(item:string):boolean
  {
    if(this.valid.codes.indexOf(item) > -1)
    {
      return true;
    }

    return false;
  }

  protected signout()
  {
    this.router.navigate(["/logout"]);

    //var exit = require('exit');
    //exit(1);
    //process.exit(1);
  }

  private test(target:ModelValidation)
  {

  }
}