
import { Component, OnInit ,Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { ModelEvent } from '../models/modelEvent';
import { EditInfo } from '../models/editInfo';
import { ManageMaster } from '../manage/manageMaster';

//定義型読み込み
import {ImportanceType} from '../common/enumDefine';
import {PageBase} from '../common/pageBase';

import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ModalPageBase } from '../common/modalPageBase';
declare var jquery:any;
declare var $ :any;


@Component({
  selector: 'app-calendar-edit',
  templateUrl: './calendar-edit.component.html',
  styleUrls: ['./calendar-edit.component.css']
})
export class CalendarEditComponent extends ModalPageBase{
  @Input() editTarget:ModelEvent;
  @Input() editInfo:EditInfo;
  
  targetMouthEvents:ModelEvent[];
  
  types:Map<string,string>;
  categories:Map<string,string>;

  constructor(activeModal: NgbActiveModal
    ,http: HttpClient
    ,router: Router)
  {
    super(activeModal,http,router);
  }

  onInitLoad(){
    this.types = ManageMaster.getTypes(this.http);
    this.categories = ManageMaster.getCategories(this.editTarget.type,this.http);
    
    let self = this;
    let picker = $('#eventDate');
    picker.datepicker({
      autoclose: true,
      showButtonPanel: true,
      format: 'yyyy/mm/dd',
//      setDate: this.editTarget.eventDateString
    }).on({
      changeDate : function() {
        self.editTarget.eventDateString=picker.val();
      }
    });
    //初期値をDatePickerに設定
    picker.datepicker("setDate",this.editTarget.eventDateString);
  }

  onClickRegister(){

    let result : ModelEvent = null;

    if(this.editInfo.editMode === 1){
      this.ExePostEvent(environment.parentPath + 'api/event/createEvent' + environment.endPath);
    }
    else
    {
      this.ExePostEvent(environment.parentPath + 'api/event/updateEvent' + environment.endPath);
    }
    //this.activeModal.close(result);
  }

  private ExePostEvent(url:string)
  {
    let body =
      {
        target:this.editTarget.requestObject(),
      };
      
    let self = this;

    this.http.post<ModelEvent>(url ,this.editTarget.requestObject())
    // subscribeの時点でModelEvent[]として受け取れる
    .subscribe(
      response => {
        let result = self.getPostResult(response);        

        if(self.isValid)
        {
          let target:ModelEvent = ModelEvent.create(result);
          self.targetMouthEvents[target.eventId] = target;
          self.close();
        }
      },
    );
  }
  
  onClickCancel(){
    this.close();
  }

  onChangeType()
  {
    this.categories = ManageMaster.getCategories(this.editTarget.type,this.http);
    this.categories.set("","");
    this.editTarget.category = "";

  }
  
}
