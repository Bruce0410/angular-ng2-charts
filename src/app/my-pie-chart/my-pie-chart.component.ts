import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-my-pie-chart',
  templateUrl: './my-pie-chart.component.html',
  styleUrls: ['./my-pie-chart.component.css']
})
export class MyPieChartComponent implements OnInit {
  money: string[] = [];
  index: string[] = [];
  click: string[] = [];
  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
        font: {
          size: 20,
        },
        // formatter: function(value, context) {
        //   return context.chart.data.labels[context.dataIndex];
        // }
      },
    }
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)','rgba(54, 162, 235,0.3)','rgba(12, 92, 105,0.3)'],
    },
  ];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getData();
  }


  getData() {
    return this.http.get('http://www.json-generator.com/api/json/get/bVWnyReTxe?indent=2').subscribe((res: any) => {
      console.log(res);
      for (let index = 0; index < res.data.length; index++) {
        const element = res.data[index].金額;
        const element2 = res.data[index].銷售日期;
        this.pieChartData.push(element)
        this.pieChartLabels.push(element2);

      }

    })
  }
}
