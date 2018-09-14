import { Component, OnInit, OnDestroy } from '@angular/core';

import { trigger, state, transition, style, animate } from '@angular/animations';

import { Subscription } from 'rxjs/Subscription';

import { ManageValue } from './manage/manageValue';
import { SharedValueService } from './service/sharedValue.service';
//Todo.tsを読み込む
//import { Todo } from './todo';

//Todotable.tsを読み込む
//import { TodotableComponent } from './todotable.component';

@Component({
  //このコンポーネントを他のコンポーネントから呼び出す時の名前
  selector: 'my-app',
  //Webページで表示するHTML
  //基本のテンプレートはIndex.html
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
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
//<todotable></todotable>
export class AppComponent implements OnInit,OnDestroy   { 
  imgURL = "url('/app/common-img/back.jpg')";
  name = 'Angular4';
  
  /**
   * 読み込み状態を取得するプロパティ
   *
   * @type {String}
   * @memberof AppComponent
   */
  _pagestate: string = "before";
  set pagestate(str: string) {this._pagestate = str;}
  get pagestate() { return this._pagestate; }

  private pagepath:string;

  isNavi:boolean;
  /**
   * subscribe を保持するための Subscription
   *
   * @private
   * @type {Subscription}
   * @memberof AppComponent
   */
  private subscription: Subscription;

  private currentPage:string;

  /**
   * コンストラクタ. 
   *
   * @param {SharedValueService} sharedValueService 共通値サービス
   * @memberof AppComponent
   */
  constructor(private sharedValueService:SharedValueService)
  {

  }

  /**
   * ライフサイクルメソッド｡コンポーネントの初期化で使用する
   *
   * @memberof AppComponent
   */
  ngOnInit() {
    
    // イベント登録
    // サービスで共有しているデータが更新されたら発火されるイベントをキャッチする
    this.subscription = this.sharedValueService.initSharedDataSource("pageupd",(
      msg => {
        console.log('[sharedValueService pagestate] shared data updated.' + msg);
        this.pagestate = msg;
      }
    ));
    
    this.subscription = this.sharedValueService.initSharedDataSource("pageredirect",(
      event => {
        console.log('[sharedValueService currentPage] shared data updated.' + event);
        this.currentPage = event['pageId'];
        this.isNavi = event['isNavi'];
      }
    ));
  }
  
  /**
   * コンポーネント終了時の処理
   *
   * @memberof AppComponent
   */
  ngOnDestroy() {
    //  リソースリーク防止のため CommonService から subcribe したオブジェクトを破棄する
    this.subscription.unsubscribe();
  }

  onChangePanelState() {
    this.pagestate = (this.pagestate === 'before' ? 'after' : 'before');
  }

  golink()
  {
    this.sharedValueService.onSharedDataChanged("pageupd","before");

    return true;
  }
//  todos=[
//    { id:1, detail: "Viewの作成"},
//    { id:1, detail: "Ctrlの作成"},
//    { id:1, detail: "Modelの作成"}
//  ] 
}
