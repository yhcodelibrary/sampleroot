import { NgModule, ErrorHandler }  from '@angular/core';
import { FormsModule} from '@angular/forms';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent }  from './app.component';

import { ChartsModule } from 'ng2-charts/ng2-charts';

import CommonErrorHandler  from './common-ts/commonErrorHandler';


//Todotable.tsを読み込む
//import { TodotableComponent } from './todotable.component';

//ルート設定モジュールを読む
import{ RouterModule } from '@angular/router';

//個別のモジュールを読み込む
import { CalendarComponent } from './calendar/calendar.component'; 
import { LoginComponent } from './login/login.component';
import { CalendarEditComponent } from './calendar-edit/calendar-edit.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { ApiComponent } from './api/api.component';
import { environment } from '../environments/environment';
import { AllListComponent } from './all-list/all-list.component';
import { GraphComponent } from './graph/graph.component';


@NgModule({
  imports:      [ BrowserModule ,
    FormsModule,
    HttpClientModule,
    ChartsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(
//      environment.appRoutes
      [
//        { path: 'todo',component:TodotableComponent},
        { path: 'calendar',component:CalendarComponent},
        { path: 'login',component:LoginComponent},
        { path: 'list',component:AllListComponent},
        { path: 'graph',component:GraphComponent},
        { path: 'logout',component:LoginComponent},
        //{ path: 'test/api/:action',component:ApiComponent},
      ]
    )
  ],
  entryComponents: [CalendarEditComponent],
  declarations: [ AppComponent,
//    TodotableComponent,
    CalendarComponent,
    LoginComponent,
    AllListComponent,
    GraphComponent,
    TodoListComponent,
    CalendarEditComponent,
    ApiComponent
  ],
  providers: [ { provide: ErrorHandler, useClass: CommonErrorHandler } ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { 
  constructor(){
  }
}
