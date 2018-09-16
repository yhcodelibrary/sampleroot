import { Component, OnInit } from '@angular/core';
import { HttpAccessService } from '../service/httpAccess.service';
import { PageBase } from '../common/pageBase';
import { Router } from '@angular/router';
import { ModelEvent } from '../models/modelEvent';
import { MasterValueService } from '../service/masterValue.service';

import { trigger, state, transition, style, animate } from '@angular/animations';
import { Subscription, Observable } from 'rxjs';
import { SharedValueService } from '../service/sharedValue.service';
import { ManageUtil } from '../manage/magangeUtil';

declare var $ :any;

@Component({
  selector: 'app-all-list',
  templateUrl: './all-list.component.html',
  styleUrls: ['./all-list.component.css'],
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
export class AllListComponent extends PageBase {

  fromDate:string;
  toDate:string;
  targetEvents:MouseEvent[] = [];
  state:string = 'before';
  
  /**
   * subscribe を保持するための Subscription
   *
   * @private
   * @type {Subscription}
   * @memberof AllListComponent
   */
  private subscription: Subscription;

  constructor(private httpAccess:HttpAccessService
    ,private masterValueService:MasterValueService
    ,private sharedValueService:SharedValueService
    ,router:Router) 
  { 
    super(router);
  }

  onInitLoad()
  {

    let self = this;
    let fpicker = $('#fromDateInput');
    fpicker.datepicker({
      autoclose: true,
      showButtonPanel: true,
      format: 'yyyy/mm/dd',
//      setDate: this.editTarget.eventDateString
    }).on({
      changeDate : function() {
        self.fromDate=fpicker.val();
      }
    });
    //初期値をDatePickerに設定
    fpicker.datepicker("setDate",this.fromDate);

    let tpicker = $('#toDateInput');
    tpicker.datepicker({
      autoclose: true,
      showButtonPanel: true,
      format: 'yyyy/mm/dd',
//      setDate: this.editTarget.eventDateString
    }).on({
      changeDate : function() {
        self.toDate=tpicker.val();
      }
    });
    //初期値をDatePickerに設定
    tpicker.datepicker("setDate",this.toDate);

    
    // サービスで共有しているデータが更新されたら発火されるイベントをキャッチする
    this.subscription = this.sharedValueService
      .initSharedDataSource("listupd",(
      msg => {
        console.log('[sharedValueService listupd] shared data updated.' + msg);
        this.state = msg;
      }
    ));
    
    const today = new Date();
    //対象年月の１日を取得
    let start = new Date(today.getFullYear(),today.getMonth(),1);
    //翌月の１日を取得
    let end = new Date(today.getFullYear(),today.getMonth()+1,1);

    this.fromDate = ManageUtil.convertDateToString(start);
    this.toDate = ManageUtil.convertDateToString(end);

    this.onClickSearch();
  }
  
  /**
   * コンポーネント終了時の処理
   *
   * @memberof AllListComponent
   */
  onDestroyLoad() {
    //  リソースリーク防止のため CommonService から subcribe したオブジェクトを破棄する
    this.subscription.unsubscribe();
  }

  onClickSearch()
  {
    
    this.sharedValueService.onSharedDataChanged('listupd','before');

    const body = {
      fromDate:this.fromDate,
      toDate:this.toDate
    }

    const self = this;

    const func = (function(response){

      let result = self.getPostResult(response.body);

      if(self.isValid)
      {
        self.targetEvents = result;
        
        //同一スレッド上でstateを切り替えないようにするためタイマーで分離する
        let isExe = true;
        Observable.interval(1)
        .takeWhile(() => isExe)
        .subscribe(i => { 
          self.sharedValueService.onSharedDataChanged('listupd','after');
          isExe = false;
        });
      }
    });

    this.httpAccess.postAuthApp(func,body,'api/event/getRangeEvents');
    
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
}
