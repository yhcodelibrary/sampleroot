import { Component, OnInit, ViewChild } from '@angular/core';

import { ChartsModule, BaseChartDirective } from 'ng2-charts/ng2-charts';
import 'chart.js/src/chart';
import { PageBase } from '../common/pageBase';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpAccessService } from '../service/httpAccess.service';
import { ManageUtil } from '../manage/magangeUtil';
declare var $ :any;

//"../node_modules/chart.js/src/chart.js",
@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent extends PageBase {

  constructor(private httpAccess:HttpAccessService,
    router:Router) 
  { 
    super(router);
  }

  //@ViewChild(BaseChartDirective)
  //@ViewChild('doughChart')
  //private doughChart: BaseChartDirective; 

  @ViewChild(BaseChartDirective)
  //@ViewChild('barChart')
  private chart: BaseChartDirective; 

  type:string;
  fromDate:string;
  toDate:string;

  onInitLoad()
  {
    this.type = "302";
    
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
    
    const today = new Date();
    //対象年月の１日を取得
    let start = new Date(today.getFullYear(),today.getMonth(),1);
    //翌月の１日を取得
    let end = new Date(today.getFullYear(),today.getMonth()+1,1);

    this.fromDate = ManageUtil.convertDateToString(start);
    this.toDate = ManageUtil.convertDateToString(end);

    this.onClickSearch();
  }

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  
  public doughnutChartType:string = 'doughnut';
  public doughnutChartLabels:string[] = ['食費', 
    '住居費', 
    '水道光熱費', 
    '娯楽費', 
    '交通・通信費', 
    '交際費'];
  public doughnutChartData:number[] = [6500, 70000, 4000, 50000, 5000, 2000];

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  onClickSearch()
  {
    
    const body = {
      type:this.type,
      fromDate:this.fromDate,
      toDate:this.toDate
    }

    const self = this;

    const func = (function(response){

      let result = self.getPostResult(response.body);

      if(self.isValid)
      {
        
        self.doughnutChartData = [];

        while(self.chart.chart.data.labels.length > 0)
        {
          self.chart.chart.data.labels.pop();
        }

        for(let i = 0; i < result.length; i++) {

          self.doughnutChartData.push(result[i].amount);
          self.chart.chart.data.labels.push(result[i].itemText);
        }
        
        self.chart.chart.update();
      }
    });

    this.httpAccess.postAuthApp(func,body,'api/event/getEventSummary');
    
  }

 
  public chartHovered(e:any):void {
    console.log(e);
  }
}
