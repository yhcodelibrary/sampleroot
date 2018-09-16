import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Component ,ChangeDetectorRef} from '@angular/core';
import { NgbModal ,ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { CalendarEditComponent} from '../calendar-edit/calendar-edit.component';
//Todo.tsを読み込む
import { ModelEvent } from '../models/modelEvent';
import { EditInfo } from '../models/editInfo';

import { trigger, state, transition, style, animate } from '@angular/animations';

//定義型読み込み
import {PageBase} from '../common/pageBase';

import { ManageValue } from '../manage/manageValue';
import { Router } from '@angular/router';
import { SharedValueService } from '../service/sharedValue.service'
import { Subscription, Observable } from 'rxjs';
import { HttpAccessService } from '../service/httpAccess.service';
import { MasterValueService } from '../service/masterValue.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  animations: [
    //panelOpenTriggerを設定されたステートに従って動的に切り替える
    trigger('panelOpenTrigger', [
      state('before', style({ 
        //opacity: 0.1 , 
        transform:"scaleY(0)" })),
      state('after', style({ 
        //opacity: 1.0 , 
        transform:"scaleY(1)" })),
      transition('before => after', animate('200ms ease-in'))
    ])
  ]
})

export class CalendarComponent extends PageBase  {

  firstWeek:Date[];
  secondWeek:Date[];
  thirdWeek:Date[];
  forthWeek:Date[];
  fifthWeek:Date[];

  monthEvents:Array<ModelEvent>[];
  monthEventDisp:boolean[];

  get targetMouthEvents():ModelEvent[]
  {
    return ManageValue.getValue<ModelEvent[]>("targetMouthEvents");
  }
  set targetMouthEvents(value:ModelEvent[])
  {
    ManageValue.setValue<ModelEvent[]>("targetMouthEvents",value);
  }
  targetDayEvents:ModelEvent[];

  targetEvent:ModelEvent;

  selectedDate:Date = null;
  
  targetYear:number;
  targetMouth:number;

  todayState:string = 'before';

  /**
   * subscribe を保持するための Subscription
   *
   * @private
   * @type {Subscription}
   * @memberof AppComponent
   */
  private subscription: Subscription;

  /**
   * Creates an instance of CalendarComponent.
   * @param {ChangeDetectorRef} chRef
   * @param {NgbModal} modalService
   * @param {SharedValueService} sharedValueService 共通値サービス
   * @param {HttpAccessService} httpAccess
   * @param {MasterValueService} masterValueService
   * @param {Router} router
   * @memberof CalendarComponent
   */
  constructor(private chRef: ChangeDetectorRef
    ,private modalService: NgbModal
    ,private sharedValueService: SharedValueService
    ,private httpAccess:HttpAccessService
    ,private masterValueService: MasterValueService
    ,router: Router){

    super(router);
  }

  
  /**
   * コンポーネント終了時の処理
   *
   * @memberof CalendarComponent
   */
  onDestroyLoad() {
    //  リソースリーク防止のため CommonService から subcribe したオブジェクトを破棄する
    this.subscription.unsubscribe();
  }

  /**
   * 初期処理
   *
   * @memberof CalendarComponent
   */
  onInitLoad(){

    var today = new Date();

    this.targetEvent = new ModelEvent();

    // サービスで共有しているデータが更新されたら発火されるイベントをキャッチする
    this.subscription = this.sharedValueService
      .initSharedDataSource("calupd",(
      msg => {
        console.log('[sharedValueService cal] shared data updated.' + msg);
        this.todayState = msg;
      }
    ));

    this.createCalendar(today.getFullYear(),today.getMonth());

  }
  
  onClickEvent(event:ModelEvent){
    this.targetEvent = event;
    this.chRef.detectChanges();
  }

  /**
   * 追加登録ボタン押下
   *
   * @memberof CalendarComponent
   */
  onClickRegisterOpen()
  {
    const ei = new EditInfo();
    ei.editMode = 1;
    
    let ev:ModelEvent = new ModelEvent();
    ev.eventDate = this.selectedDate;

    this.openModal(ev,ei);
  }

  /**
   * 変更ボタン押下
   *
   * @param {ModelEvent} model
   * @memberof CalendarComponent
   */
  onClickEditOpen(model:ModelEvent):void
  {
    let ei = new EditInfo();
    ei.editMode = 2;
    
    this.openModal(model.clone(),ei);
  }
  private openModal(model:ModelEvent,ei:EditInfo)
  {
    const modalRef = this.modalService.open(CalendarEditComponent);
    modalRef.componentInstance.editTarget = model.clone();
    modalRef.componentInstance.editInfo = ei;

    let ret;
    let self = this;
    
    modalRef.result.then(
      result => {
        // on close
        ret = result;// 戻り値
        if(result !== null){
          if(self.targetMouthEvents[result.eventId]){
            self.targetMouthEvents[result.eventId].reflect(result);
          }
          else{
            self.setEvent(result); 
          }
          
          self.onClickDate(self.selectedDate);
        }
      }
      , (reason) => {
        // on dismiss
        if (reason === ModalDismissReasons.ESC) {
          ret = 'エスケープ';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          ret = '背景をクリック';
        } else {
          ret = 'それ以外';// dismissの場合このロジックを通る
        }
        return ret;
      }
    );
  }

  onClickDelete(ev:ModelEvent){

    let body = ev;

    let self = this;
        
    const func=(function(response){
      
      let result = self.getPostResult(response.body);
      self.removeEvent(ev);
      self.onClickDate(self.selectedDate);
    });
    
    this.httpAccess.postAuthApp(func,body,'api/event/deleteEvent');
  }

  /**
   * 年月日の変更イベント
   *
   * @param {number} year
   * @param {number} month
   * @param {number} monthDiff
   * @memberof CalendarComponent
   */
  onClickChangeMonth(year:number,month:number,monthDiff:number){
  
    month = month + monthDiff;
    //年月の更新
    if(month === -1){
      year = year -1;
      month = 11;
    }else if(month === 12){
      year = year + 1;
      month = 0;
    }
  
    this.sharedValueService.onSharedDataChanged('pageupd','before');

    //カレンダーの更新
    this.createCalendar(year,month);
  }

  //日のクリックイベント
  onClickDate(day:Date)
  {
    this.sharedValueService.onSharedDataChanged('calupd','before');
    this.selectedDate = day;
    this.setDayEvents(day);
    
    //同一スレッド上でstateを切り替えないようにするためタイマーで分離する
    let isExe = true;
    let self = this;
    Observable.interval(1)
    .takeWhile(() => isExe)
    .subscribe(i => { 
      self.sharedValueService.onSharedDataChanged('calupd','after');
      isExe = false;
    });
  }

  getTypeName(model:ModelEvent)
  {
    return this.masterValueService.getTypes().get(model.type);
  }
  getCategoryName(model:ModelEvent)
  {
    const name = this.masterValueService.getCategories(model.type).get(model.category);
    return name;
  }

  /**
   * 反映イベント
   *
   * @param {ModelEvent} model
   * @memberof CalendarComponent
   */
  reflectEvent(model:ModelEvent)
  {
    this.targetMouthEvents[model.eventId] = model;
  }

  removeEvent(tmp:ModelEvent)
  {

    this.targetMouthEvents = this.targetMouthEvents.filter(n => n.eventId !== tmp.eventId);
    let evekey = tmp.eventDate.getMonth()*100 + tmp.eventDate.getDate();
    this.monthEvents[evekey] = this.monthEvents[evekey].filter(n => n.eventId !== tmp.eventId);
  }

  setEvent(tmp:ModelEvent)
  {

    this.targetMouthEvents[tmp.eventId] = tmp;
    let evekey = tmp.eventDate.getMonth()*100 + tmp.eventDate.getDate();
    if(this.monthEvents[evekey] == undefined)
    {
      this.monthEvents[evekey] = new Array<ModelEvent>();
    }
    if(this.monthEvents[evekey].length >= 2)
    {
      this.monthEventDisp[evekey] = true;
    }
    else
    {
      this.monthEvents[evekey].push(tmp);
    }
  }

  /**
   * カレンダー作成
   *
   * @param {number} targetY
   * @param {number} targetM
   * @memberof CalendarComponent
   */
  createCalendar(targetY:number,targetM:number){
    

    this.targetYear = targetY;
    this.targetMouth = targetM;

    //今月のイベントを取得
    this.targetMouthEvents = [];
    ///////////////////////////////////
    
    let body = 
      {
        "year":targetY,
        "month":targetM,
      };

    let self = this;
    
    this.monthEvents = [];
    this.monthEventDisp = [];
    
    const func=(function(response){
      
      let result = self.getPostResult(response.body);

      for(let i = 0; i < result.length; i++) {
        let tmp:ModelEvent = ModelEvent.create(result[i]);
        //イベントIDをキーにマップに登録する
        self.setEvent(tmp);
      }
      
      self.sharedValueService.onSharedDataChanged('pageupd','after');
    });
    
    this.httpAccess.postAuthApp(func,body,'api/event/getMonthEvents');
    
    //対象年月の１日を取得
    let target = new Date(targetY,targetM,1);
    
    //1日の曜日を取得
    let firstDayNumber = target.getDay();
    
    //一週目の日曜の日付を計算
    let startDay = this.addDate(target,-firstDayNumber);
    
    //５週目までの日付をすべて埋める
    this.firstWeek = new Array();
    startDay = this.setWeekDays(this.firstWeek,startDay);
    this.secondWeek = new Array();
    startDay = this.setWeekDays(this.secondWeek,startDay);
    this.thirdWeek = new Array();
    startDay = this.setWeekDays(this.thirdWeek,startDay);
    this.forthWeek = new Array();
    startDay = this.setWeekDays(this.forthWeek,startDay);
    this.fifthWeek = new Array();
    startDay = this.setWeekDays(this.fifthWeek,startDay);

  }

  //対象日付から始まる１周間を格納
  setWeekDays(week:Date[],startDay:Date):Date{

    for(let i = 0; i < 7; i++){
      week.push(startDay);
      startDay = this.addDate(startDay,1);
    }

    return startDay;
  }

  //対象日付のTodoを取得する
  getTodoForDate(target:Date){
    
  }

  //対象日付に番号分たされた年月日を返す
  addDate(target:Date,addNumber:number):Date{

    var newDate = new Date(target.getFullYear(),target.getMonth(),target.getDate());
    newDate.setDate(newDate.getDate() + addNumber);
    
    return newDate;
  }
  
  //
  setDayEvents(target:Date)
  {
    this.targetDayEvents = new Array();

    for(let key in this.targetMouthEvents)
    {
      let value:ModelEvent = this.targetMouthEvents[key];

      if(target.getFullYear() === value.eventDate.getFullYear()
        && target.getMonth() === value.eventDate.getMonth()
        && target.getDate() === value.eventDate.getDate())
      {
        this.targetDayEvents.push(value);
      }
    }
  }

  //対象日のイベントを取得する
  //指定数-1まで取得したらやめる
  getDayEvent(target:Date,num:number = 256):ModelEvent[]{

    let ret = new Array();
    let cnt = 0;

    for(let key in this.targetMouthEvents)
    {
      let value:ModelEvent = this.targetMouthEvents[key];
      if(cnt >= num)
      {
        break;
      }

      if(target.getFullYear() === value.eventDate.getFullYear()
        && target.getMonth() === value.eventDate.getMonth()
        && target.getDate() === value.eventDate.getDate())
      {
        cnt++;
        ret.push(value);
      }
    }

    return ret;
  }

  //現在イベントを保持しているかどうか。
  has_event():boolean
  {
    if(this.targetDayEvents !== null && this.targetDayEvents !== undefined
      && this.targetDayEvents.length !== 0)
    {
      return true;
    }
    return false;
  }

  //土曜かどうか
  is_saturday(target:Date):boolean{

    //対象の曜日を取得
    var dayNumber = target.getDay();

    return dayNumber === 6;
  }

  //日曜かどうか
  is_sunday(target:Date):boolean{
    
    //対象の曜日を取得
    var dayNumber = target.getDay();
    
    return dayNumber === 0;
  }

  //祝日かどうか
  is_holiday(target:Date):boolean{
    
    //対象の曜日を取得
    var dayNumber = target.getDay();
    
    return dayNumber === 0;
  }
  selected_cal(target:Date):boolean
  {
    if(this.selectedDate === null || this.selectedDate === undefined)
    {
      return false;
    }
    if(target.getFullYear() === this.selectedDate.getFullYear()
      && target.getMonth() === this.selectedDate.getMonth()
      && target.getDate() === this.selectedDate.getDate())
    {
      return true;
    }
    return false;
  }
  //カレンダーに出力する要素クラスを出力する
  getCalClass(model:ModelEvent):string
  {
      let cls :string;
      switch(model.type)
      {
        case "301":
          cls = "income";
          break;
        case "302":
          cls = "expence";
          break;
      }

      return cls;
  }
}
