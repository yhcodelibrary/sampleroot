import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModelValidation } from '../models/modelValidation';
import { ManageMaster } from '../manage/manageMaster';

import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { BasicPageBase } from './basicPageBase';

import { environment } from '../../environments/environment';

export class PageBase extends BasicPageBase {
  

  
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

  constructor(http: HttpClient
    ,router: Router)
  {
    super(http,router);
  }

  
}