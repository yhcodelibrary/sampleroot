
import { Router } from '@angular/router';
import { BasicPageBase } from './basicPageBase';

/**
 * 通常ページ基底クラス
 *
 * @export
 * @class PageBase
 * @extends {BasicPageBase}
 */
export class PageBase extends BasicPageBase {

  /**
   *Creates an instance of PageBase.
   * @param {Router} router
   * @memberof PageBase
   */
  constructor(router: Router)
  {
    super(router);
  }

　//ToDo削除予定
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
  
}