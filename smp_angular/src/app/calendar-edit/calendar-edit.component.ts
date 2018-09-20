
import { Component, OnInit ,Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { ModelEvent } from '../models/modelEvent';
import { EditInfo } from '../models/editInfo';

import { Router } from '@angular/router';
import { ModalPageBase } from '../common/modalPageBase';
import { MasterValueService } from '../service/masterValue.service';
import { HttpAccessService } from '../service/httpAccess.service';
declare var jquery:any;
declare var $ :any;


/**
 * イベント編集コンポーネント
 *
 * @export
 * @class CalendarEditComponent
 * @extends {ModalPageBase}
 */
@Component({
  selector: 'app-calendar-edit',
  templateUrl: './calendar-edit.component.html',
  styleUrls: ['./calendar-edit.component.css']
})
export class CalendarEditComponent extends ModalPageBase{
  /**
   * 更新イベント情報
   *
   * @type {ModelEvent}
   * @memberof CalendarEditComponent
   */
  @Input() editTarget:ModelEvent;

  /**
   * 編集情報モデル
   *
   * @type {EditInfo}
   * @memberof CalendarEditComponent
   */
  @Input() editInfo:EditInfo;
  
  //Todo 削除予定
  targetMouthEvents:ModelEvent[];
  
  /**
   * 表示中の収支タイプ
   *
   * @type {Map<string,string>}
   * @memberof CalendarEditComponent
   */
  types:Map<string,string>;

  /**
   * 表示中のしゅべつ
   *
   * @type {Map<string,string>}
   * @memberof CalendarEditComponent
   */
  categories:Map<string,string>;

  /**
   *Creates an instance of CalendarEditComponent.
   * @param {NgbActiveModal} activeModal
   * @param {HttpClient} http
   * @param {MasterValueService} masterValueService
   * @param {HttpAccessService} httpAccess
   * @param {Router} router
   * @memberof CalendarEditComponent
   */
  constructor(activeModal: NgbActiveModal
    ,http: HttpClient
    ,private masterValueService:MasterValueService
    ,private httpAccess:HttpAccessService
    ,router: Router)
  {
    super(activeModal,router);
  }

  /**
   * 初期ロード
   *
   * @memberof CalendarEditComponent
   */
  onInitLoad(){
    this.types = this.masterValueService.getTypes();
    this.categories = this.masterValueService.getCategories(this.editTarget.type);
    
    let self = this;
    let picker = $('#eventDate');
    picker.datepicker({
      autoclose: true,
      showButtonPanel: true,
      format: 'yyyy/mm/dd',
    }).on({
      changeDate : function() {
        self.editTarget.eventDateString=picker.val();
      }
    });
    //初期値をDatePickerに設定
    picker.datepicker("setDate",this.editTarget.eventDateString);
  }

  /**
   * 登録ボタン押下
   *
   * @memberof CalendarEditComponent
   */
  onClickRegister(){

    let result : ModelEvent = null;

    if(this.editInfo.editMode === 1){
      this.ExePostEvent('api/event/createEvent');
    }
    else
    {
      this.ExePostEvent('api/event/updateEvent');
    }
  } 

  /**
   * 登録、更新イベント共通
   *
   * @private
   * @param {string} url
   * @memberof CalendarEditComponent
   */
  private ExePostEvent(url:string)
  {
    const body =this.editTarget.requestObject();
      
    const self = this;

    const func = (function(response){

      let result = self.getPostResult(response.body);        

      //バリデーションエラーがない場合
      if(self.isValid)
      {
        let target:ModelEvent = ModelEvent.create(result);
        self.close(target);
      }

    });

    this.httpAccess.postAuthApp(func,body,url);
  }
  
  /**
   * キャンセルクリック
   *
   * @memberof CalendarEditComponent
   */
  onClickCancel(){
    this.close(null);
  }

  /**
   * 収支タイプ変更時イベント
   *
   * @memberof CalendarEditComponent
   */
  onChangeType()
  {
    this.categories = this.masterValueService.getCategories(this.editTarget.type);
    this.categories.set("","");
    this.editTarget.category = "";

  }
  
}
