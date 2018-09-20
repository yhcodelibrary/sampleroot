import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasicPageBase } from '../common/basicPageBase';
import { HttpAccessService } from '../service/httpAccess.service';

/**
 * ログアウト処理
 *
 * @export
 * @class LogoutComponent
 * @extends {BasicPageBase}
 */
@Component({
  selector: 'app-logout',
  template: ''
})
export class LogoutComponent extends BasicPageBase {

  /**
   *Creates an instance of LogoutComponent.
   * @param {HttpAccessService} httpAccess
   * @param {Router} router
   * @memberof LogoutComponent
   */
  constructor(private httpAccess: HttpAccessService
    ,router: Router){
      super(router);
  }

  /**
   * 初期ロード処理
   *
   * @memberof LogoutComponent
   */
  onInitLoad() {
    
    //サーバーサイドにログアウト処理を投げる
    this.httpAccess.postApp({},null,'api/account/logout');

    //初期画面に遷移
    this.router.navigate(['']);
  }

}
