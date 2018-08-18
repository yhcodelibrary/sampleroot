// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

// import { Routes } from '@angular/router'; 
// import { LoginComponent } from '../app/login/login.component';
// import { CalendarComponent } from '../app/calendar/calendar.component';
// import { TodoListComponent } from '../app/todo-list/todo-list.component';

export const environment = {
  production: false
  ,parentPath: "http://localhost:8080/"
  ,endPath: ""
  // ,appRoutes: [ // 追加
  //   { path: 'calendar',component:CalendarComponent},
  //   { path: 'login',component:LoginComponent},
  //   { path: 'list',component:TodoListComponent},
  // ]
};
