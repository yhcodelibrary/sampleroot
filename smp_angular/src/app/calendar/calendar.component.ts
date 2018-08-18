import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Component ,ChangeDetectorRef} from '@angular/core';
import { NgbModal ,ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { CalendarEditComponent} from '../calendar-edit/calendar-edit.component';
//Todo.tsを読み込む
import { ModelEvent } from '../models/modelEvent';
import { EditInfo } from '../models/editInfo';

//定義型読み込み
import {PageBase} from '../common/pageBase';

import { ManageUtil } from '../manage/magangeUtil';
import { ManageValue } from '../manage/manageValue';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { ManageMaster } from '../manage/manageMaster';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent extends PageBase  {

  firstWeek:Date[];
  secondWeek:Date[];
  thirdWeek:Date[];
  forthWeek:Date[];
  fifthWeek:Date[];

  monthEvents:Array<ModelEvent>[];
  monthEventDisp:boolean[];

  //targetMouthEvents:ModelEvent[];
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

  selectedDate:Date;
  
  targetYear:number;
  targetMouth:number;

  constructor(private chRef: ChangeDetectorRef
    ,private modalService: NgbModal
    ,http: HttpClient
    ,router: Router){

    super(http,router);
  }

  onInitLoad(){

    var today = new Date();

    this.targetEvent = new ModelEvent();

    this.createCalendar(today.getFullYear(),today.getMonth());

  }
  
  onClickEvent(event:ModelEvent){
    this.targetEvent = event;
    this.chRef.detectChanges();
  }

  //追加登録ボタン押下
  onClickRegisterOpen()
  {
    const ei = new EditInfo();
    ei.editMode = 1;
    
    this.openModal(new ModelEvent(),ei);
  }

  //変更ボタン押下
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
    modalRef.componentInstance.targetMouthEvents = this.targetMouthEvents;

    let ret;
    
    modalRef.result.then(
      result => {
        // on close
        ret = result;// 戻り値
        // if(result !== null){
        //   this.targetMouthEvents[result.id].reflect(result);
        // }
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
    
    // modalRef.close = (result) => {
    //   let test = 1;
    // };
    // modalRef.dismiss = (reason) => {
    //   let test = 1;
    // };
  }

  //年月日の変更イベント
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
  
    //カレンダーの更新
    this.createCalendar(year,month);
  }

  //日のクリックイベント
  onClickDate(day:Date)
  {
    this.selectedDate = day;
    this.setDayEvents(day);
  }

  getTypeName(model:ModelEvent)
  {
    return ManageMaster.getTypes(this.http).get(model.type);
  }
  getCategoryName(model:ModelEvent)
  {
    let name =ManageMaster.getCategories(model.type,this.http).get(model.category);
    return name;
  }

  //反映イベント
  reflectEvent(model:ModelEvent)
  {
    this.targetMouthEvents[model.eventId] = model;
  }

  //カレンダー作成
  createCalendar(targetY:number,targetM:number){
    

    this.targetYear = targetY;
    this.targetMouth = targetM;

    //今月のイベントを取得
    this.targetMouthEvents = [];
    ///////////////////////////////////
    
    // let headers = new HttpHeaders();    
    // headers.append('Content-Type', 'application/x-www-form-urlencoded');
    // ,{headers: headers}
    let body = 
      {
        "year":targetY,
        "month":targetM,
      };

    let self = this;
    
    this.monthEvents = [];
    this.monthEventDisp = [];
    // let target = new Date(targetY,targetM,1);
    // for(let i=1;i < 32;i++)
    // {
    //   this.monthEvents[ManageUtil.convertDateToString(target)] = new Array<ModelEvent>();
    //   target = this.addDate(target,1);
    // }

    this.http.post//<ModelEvent[]>
      (environment.parentPath + 'api/event/getMonthEvents' + environment.endPath 
      ,body)
    // subscribeの時点でModelEvent[]として受け取れる
    .subscribe(
      response => {
        let result = self.getPostResult(response);

        for(let i = 0; i < result.length; i++) {
          let tmp = ModelEvent.create(result[i]);
          //let events = ManageValue.getValue<ModelEvent[]>("targetMouthEvents");
          //events[tmp.eventId] = tmp;
          //ManageValue.setValue("targetMouthEvents",events);
          self.targetMouthEvents[tmp.eventId] = tmp;
          let evekey = tmp.eventDate.getMonth()*100 +tmp.eventDate.getDate();
          if(self.monthEvents[evekey] == undefined)
          {
            self.monthEvents[evekey] = new Array<ModelEvent>();
          }
          if(self.monthEvents[evekey].length >= 2)
          {
            self.monthEventDisp[evekey] = true;
          }
          else
          {
            self.monthEvents[evekey].push(tmp);
          }
        }
      },
    //error => console.log("Error: ")
    );

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
        case "1":
          cls = "income";
          break;
        case "2":
          cls = "expence";
          break;
      }

      return cls;
  }
}
