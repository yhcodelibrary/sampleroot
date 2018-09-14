
import { Component, OnInit ,Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { ModelEvent } from '../models/modelEvent';
import { EditInfo } from '../models/editInfo';
import { ManageMaster } from '../manage/manageMaster';

//定義型読み込み
import {ImportanceType} from '../common/enumDefine';

import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { ModalPageBase } from '../common/modalPageBase';
import { MasterValueService } from '../service/masterValue.service';
import { HttpAccessService } from '../service/httpAccess.service';
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
    ,private masterValueService:MasterValueService
    ,private httpAccess:HttpAccessService
    ,router: Router)
  {
    super(activeModal,router);
  }

  onInitLoad(){
    // this.types = ManageMaster.getTypes(this.http);
    // this.categories = ManageMaster.getCategories(this.editTarget.type,this.http);
    this.types = this.masterValueService.getTypes();
    this.categories = this.masterValueService.getCategories(this.editTarget.type);
    
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
    const body =
      {
        target:this.editTarget.requestObject(),
      };
      
    const self = this;

    const func = (function(response){

      let result = self.getPostResult(response.body);        

      //バリデーションエラーがない場合
      if(self.isValid)
      {
        let target:ModelEvent = ModelEvent.create(result);
        self.targetMouthEvents[target.eventId] = target;
        self.close();
      }

    });
  }
  
  onClickCancel(){
    this.close();
  }

  onChangeType()
  {
    this.categories = this.masterValueService.getCategories(this.editTarget.type);
    this.categories.set("","");
    this.editTarget.category = "";

  }
  
}
