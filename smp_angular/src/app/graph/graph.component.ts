import { Component, OnInit, ViewChild } from '@angular/core';

import { ChartsModule, BaseChartDirective } from 'ng2-charts/ng2-charts';
import 'chart.js/src/chart';
import { PageBase } from '../common/pageBase';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpAccessService } from '../service/httpAccess.service';
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

    this.barChartData = [
      {data: [6500], label: '食費'},
      {data: [70000], label: '住居費'},
      {data: [4000], label: '水道光熱費'},
      {data: [50000], label: '娯楽費'},
      {data: [5000], label: '交通・通信費'},
      {data: [2000], label: '交際費'},
    ];
  }

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  
  public doughnutChartType:string = 'doughnut';

  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 
  // public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  // public barChartData:any[] = [
  //   {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
  //   {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  // ];
 
  public barChartLabels:string[] = ['支出'];
  public barChartData:any[];
  // public barChartData:any[] = [
  //   {data: [6500], label: '食費'},
  //   {data: [70000], label: '住居費'},
  //   {data: [4000], label: '水道光熱費'},
  //   {data: [50000], label: '娯楽費'},
  //   {data: [5000], label: '交通・通信費'},
  //   {data: [2000], label: '交際費'},
  // ];

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
 
  private setBarData(data,label){
    
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    for(let i = 0 ; i < data.length;i++)
    {
      clone[i].data = [data[i]];
    }
    //clone[0].data = data;
    //clone[0].label = label;
    this.barChartData = clone;
  }
  public randomize():void {
    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
  }
}
