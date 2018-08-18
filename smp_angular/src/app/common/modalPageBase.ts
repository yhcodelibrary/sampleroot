import { PageBase } from "./pageBase";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";


export class ModalPageBase extends PageBase {
    
  constructor(protected activeModal: NgbActiveModal
    ,http: HttpClient
    ,router: Router)
  {
    super(http,router);
  }

  public close()
  {
    this.activeModal.close(null);
  }

  protected signout()
  {
    this.activeModal.close(null);
    super.signout();
  }
}