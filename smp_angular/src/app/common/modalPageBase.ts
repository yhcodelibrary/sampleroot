import { PageBase } from "./pageBase";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";


/**
 * モーダルページ基底クラス
 *
 * @export
 * @class ModalPageBase
 * @extends {PageBase}
 */
export class ModalPageBase extends PageBase {
    
  /**
   *Creates an instance of ModalPageBase.
   * @param {NgbActiveModal} activeModal
   * @param {Router} router
   * @memberof ModalPageBase
   */
  constructor(public activeModal: NgbActiveModal
    ,router: Router)
  {
    super(router);
  }

  /**
   * モーダルクローズ
   *
   * @param {*} item
   * @memberof ModalPageBase
   */
  public close(item)
  {
    this.activeModal.close(item);
  }

  /**
   * サインアウト
   *
   * @protected
   * @memberof ModalPageBase
   */
  protected signout()
  {
    this.activeModal.close(null);
    super.signout();
  }
}