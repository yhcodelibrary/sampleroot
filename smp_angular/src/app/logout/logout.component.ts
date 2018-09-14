import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BasicPageBase } from '../common/basicPageBase';
import { HttpAccessService } from '../service/httpAccess.service';

@Component({
  selector: 'app-logout',
  template: ''
})
export class LogoutComponent extends BasicPageBase {

  constructor(private httpAccess: HttpAccessService
    ,router: Router){
      super(router);
  }

  onInitLoad() {
    
    this.httpAccess.postAuthApp({},null,'api/account/logout');

    this.router.navigate(['']);
  }

}
