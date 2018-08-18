import { Component } from '@angular/core';

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
  styleUrls: ['./app.component.css']
})
//<todotable></todotable>
export class AppComponent  { 
  imgURL = "url('/app/common-img/back.jpg')";
  name = 'Angular4';
//  todos=[
//    { id:1, detail: "Viewの作成"},
//    { id:1, detail: "Ctrlの作成"},
//    { id:1, detail: "Modelの作成"}
//  ] 
}
