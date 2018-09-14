import { NgModule,OnInit, ErrorHandler }  from '@angular/core';
import { FormsModule} from '@angular/forms';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent }  from './app.component';

import { ChartsModule } from 'ng2-charts/ng2-charts';


import CommonErrorHandler  from './common-ts/commonErrorHandler';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

//Todotable.tsを読み込む
//import { TodotableComponent } from './todotable.component';
//https://qiita.com/mnishiguchi/items/61e4290964cf11c44dd6
//https://qiita.com/mt_middle/items/ca8d24779bb9f5ca462e
//ルート設定モジュールを読む
import {RouterModule, Router, NavigationEnd, ActivatedRoute, Data } from '@angular/router';
import { Title } from '@angular/platform-browser';
import{ Location} from '@angular/common';

//個別のモジュールを読み込む
import { CalendarComponent } from './calendar/calendar.component'; 
import { LoginComponent } from './login/login.component';
import { CalendarEditComponent } from './calendar-edit/calendar-edit.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { environment } from '../environments/environment';
import { AllListComponent } from './all-list/all-list.component';
import { GraphComponent } from './graph/graph.component';
import { ManageValue } from './manage/manageValue';
import { SharedValueService } from './service/sharedValue.service';
import { LogoutComponent } from './logout/logout.component';
import { Observable,Subscription } from 'rxjs';
import { HttpAccessService } from './service/httpAccess.service';
import { MasterValueService } from './service/masterValue.service';


@NgModule({
  imports:      [ BrowserModule ,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ChartsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(
//      environment.appRoutes
      [
//        { path: 'todo',component:TodotableComponent},
        { path: 'calendar',data:{pageId:'calendar',isNavi:true},component:CalendarComponent},
        { path: 'login',data:{pageId:'login',isNavi:false},component:LoginComponent},
        { path: '',data:{pageId:'',isNavi:false},component:LoginComponent},
        { path: 'list',data:{pageId:'list',isNavi:true},component:AllListComponent},
        { path: 'graph',data:{pageId:'graph',isNavi:true},component:GraphComponent},
        { path: 'logout',data:{pageId:'logout',isNavi:false},component:LogoutComponent},
        //{ path: 'test/api/:action',component:ApiComponent},
      ]
    ),
    
  ],
//
  entryComponents: [CalendarEditComponent],
  declarations: [ AppComponent,
    CalendarComponent,
    LoginComponent,
    AllListComponent,
    GraphComponent,
    TodoListComponent,
    LogoutComponent,
    CalendarEditComponent,
  ],
  providers: [ { provide: ErrorHandler, useClass: CommonErrorHandler }
    ,SharedValueService 
    ,HttpAccessService
    ,MasterValueService
    ,
     ],
  bootstrap:    [ AppComponent ]
})
export class AppModule{// implements OnInit { 
  
  //isNavi:boolean;

  /**
   * subscribe を保持するための Subscription
   *
   * @private
   * @type {Subscription}
   * @memberof AppComponent
   */
  private subscription: Subscription;

  /**
   * コンストラクタ. ServiceSample1Component のインスタンスを生成する
   *
   * @param {SharedValueService} sharedValueService 共通値サービス
   * @memberof AppModule
   */
  constructor(private router: Router,
     private activatedRoute: ActivatedRoute,
      private titleService: Title,
      private sharedValueService:SharedValueService) 
      {

//      }
  // tslint:disable-next-line:use-life-cycle-interface
  // constructor( private location: Location,
  //   private router: Router ) {

  //   // パスが切り替わった時に毎回実施する処理。
  //   // これにより、戻るボタンが押された時にも対応可能。
  //   router.subscribe( ( path ) => {
  //   this.setDisp( path );
  //   });
  // }

  // 現在のパスを検知し、バスからスラッシュを取り除いたものをIDとして覚えておく。
  // パスが空文字列であれば、デフォルトのページをセットする。
//  ngOnInit() {

    
    // イベント登録
    // サービスで共有しているデータが更新されたら発火されるイベントをキャッチする
    // this.subscription = this.sharedValueService.sharedDataSource$.subscribe(
    //   msg => {
    //     console.log('[sharedValueService appcomp] shared data updated.');
    //   }
    // );
    // // 現在のパスを検知して、対応したdataでsetDispを発火させる

    this.router.events
    .filter(event => event instanceof NavigationEnd)
    .map(() => this.activatedRoute)
    .map(route => {
        while (route.firstChild) {
            route = route.firstChild;
        }
        return route;
    })
    .filter(route => route.outlet === 'primary')
    .mergeMap(route => route.data)
    .subscribe(event => this.setDisp(event));
  }
  
  setDisp(event:Data)
  {
    //this.isNavi = event['isNavi'];
    
    let isExe = true;
    let self = this;

    //self.sharedValueService.onSharedDataChanged('pageupd','after');
    self.sharedValueService.onSharedDataChanged('pageredirect',event);
    //同一スレッド上でstateを切り替えないようにするためタイマーで分離する
    Observable.interval(1)
    .takeWhile(() => isExe)
    .subscribe(i => { 
      self.sharedValueService.onSharedDataChanged('pageupd','after');
      isExe = false;
    });
  }
  setObserbal()
  {

  }
}
