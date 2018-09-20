import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModelValidation } from '../models/modelValidation';

import { Router } from '@angular/router';
import { OnInit,OnDestroy } from '@angular/core';
import { UnloginAccessError } from '../common-ts/UnloginAccessError';
import { ApplicationError } from '../common-ts/applicationError';


/**
 * ページ基盤クラス基礎
 *
 * @export
 * @class BasicPageBase
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
export class BasicPageBase implements OnInit ,OnDestroy {
  
  public isValid:boolean;
  public valid:ModelValidation;
  
  /**
   * 初期処理
   *
   * @memberof BasicPageBase
   */
  ngOnInit()
  {
    this.isValid = true;
    this.onInitStart();
    this.onInitLoad();
    this.onInitEnd();
  }

  onInitStart(){}
  onInitLoad(){}
  onInitEnd(){}

  /**
   * 破棄処理
   *
   * @memberof BasicPageBase
   */
  ngOnDestroy()
  {
    this.onDestroyStart();
    this.onDestroyLoad();
    this.onDestroyEnd();
  }

  onDestroyStart(){}
  onDestroyLoad(){}
  onDestroyEnd(){}

  constructor(protected router: Router)
  {
    //最初に空のバリデーションオブジェクトを作成
    this.valid = new ModelValidation();
  }

  /**
   * ポストデータ処理の共通
   *
   * @protected
   * @param {*} response
   * @returns
   * @memberof BasicPageBase
   */
  protected getPostResult(response)
  {
    this.isValid = true;
    this.valid = new ModelValidation();
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

  /**
   * 対象マップからキー情報の配列を取り出す
   *
   * @param {*} map
   * @returns
   * @memberof BasicPageBase
   */
  public getKeys(map){
    let arr =Array.from(map.keys());
    arr.unshift("");
    return arr;
  }

  /**
   * バリデーションエラー判定共通
   *
   * @param {string} item
   * @returns {boolean}
   * @memberof BasicPageBase
   */
  public isValidError(item:string):boolean
  {
    if(this.valid.codes.indexOf(item) > -1)
    {
      return true;
    }

    return false;
  }

  /**
   * サインアウト
   *
   * @protected
   * @memberof BasicPageBase
   */
  protected signout()
  {
    this.router.navigate(["/logout"]);
  }
}