//https://qiita.com/ksh-fthr/items/e43dd37bff2e51e95a59

import { Injectable } from '@angular/core';

// イベント発火のための Subject を import
// Angular Ver.6.x.x では rxjs から直接importするように変更された
//import { Subject } from 'rxjs';

// こちらは Angular 6.x.x だとビルドエラーとなる
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';

@Injectable()
export class SharedValueService {

  /**
   * データの変更を通知するためのオブジェクト
   *
   * @private
   * @memberof SharedValueService
   */
  private sharedDataSource = new Subject<string>();
  private sharedDataSources:Map<string,Subject<object>> = new Map<string,Subject<object>>();
  /**
   * Subscribe するためのプロパティ
   * `- コンポーネント間で共有するためのプロパティ
   *
   * @memberof SharedValueService
   * @returns Subscription
   */
  public sharedDataSource$ = this.sharedDataSource.asObservable();
  private sharedDataSources$ : Map<string,Observable<object>> = new Map<string,Observable<object>> ();
  public initSharedDataSource(key:string,func)
  {
    let subj = new Subject<object>();
    this.sharedDataSources.set(key,subj);

    let obs = subj.asObservable();
    let subs = obs.subscribe(func);
    this.sharedDataSources$.set(key,obs)

    return subs;
  }

  /**
   * コンストラクタ. SharedValueService のインスタンスを生成する
   *
   * @memberof SharedValueService
   */
  constructor() {}

  /**
   * データの更新イベント
   *
   * @param {string} updateed 更新データ
   * @memberof SharedValueService
   */
  public onNotifySharedDataChanged(updateed: string) {
    console.log('[SharedValueService] onNotifySharedDataChanged fired.');
    this.sharedDataSource.next(updateed);
  }
  onSharedDataChanged(key:string,updateed)
  {
    let obs =this.sharedDataSources.get(key);
    obs.next(updateed);
  }
}