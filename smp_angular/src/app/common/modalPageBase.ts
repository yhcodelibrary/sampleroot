import { PageBase } from "./pageBase";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";


export class ModalPageBase extends PageBase {
    
  constructor(public activeModal: NgbActiveModal
    ,router: Router)
  {
    super(router);
  }

  public close(item)
  {
    this.activeModal.close(item);
  }

  protected signout()
  {
    this.activeModal.close(null);
    super.signout();
  }
}