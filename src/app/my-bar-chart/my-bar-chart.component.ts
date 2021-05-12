import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
@Component({
  selector: 'app-my-bar-chart',
  templateUrl: './my-bar-chart.component.html',
  styleUrls: ['./my-bar-chart.component.css']
})
export class MyBarChartComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart: any;
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [
        {
          //左邊Ｙ
          id: 'y-axis-0',
          position: 'left',
          ticks: {
            // 設定 range
            beginAtZero: true, // 0開始
            max: 2500,  //設定最大值
          },
          scaleLabel: {
            display: true,
            labelString: '次數'
          }
        },
        {
          //右邊Ｙ
          id: 'y-axis-1',
          position: 'right',
          ticks: {
            beginAtZero: true,
            stepSize: 20000, //設定間隔  每兩萬畫一個科度
            max: 100000,
          },
          // beginAtZero	boolean		如果為true，則小數位數將包含0（如果尚未包含在內）。
          // maxTicksLimit	number	11	要顯示的最大刻度線和網格線數。
          // precision	number		如果已定義stepSize但未指定，則步長將四捨五入到許多小數位。
          // stepSize	number		用戶為秤定義的固定步長。
          // suggestedMax	number		計算最大數據值時使用的調整。
          // suggestedMin	number		計算最小數據值時使用的調整。

          // 顯示Ｙ軸 名稱
          scaleLabel: {
            display: true,
            labelString: '金額'
          }
        }
      ]
    }
  };
  public barChartType: ChartType = 'bar';

  public barChartLegend = true;  //圖表上方的名稱

  //Y軸
  // public barChartData: ChartDataSets[] = [
  //   // yAxisID 可以設定數值對應的Ｙ軸  type 設定線型
  //   { data: [80000, 50000, 66400, 10000], label: '訂購金額', yAxisID: 'y-axis-1' },
  //   { data: [23000, 11000, 17000, 0], label: '退貨金額', yAxisID: 'y-axis-1', type: 'line' },
  //   { data: [1700, 1600, 2000, 0], label: '點擊次數', type: 'line' }

  // ];
  public barChartData: ChartDataSets[] = [
    // yAxisID 可以設定數值對應的Ｙ軸  type 設定線型
    { data: [], label: '金額', yAxisID: 'y-axis-1' },
    { data: [], label: '數量', yAxisID: 'y-axis-1', type: 'line' },
    { data: [], label: '次數', type: 'line' }

  ];

  //Ｘ軸
  // public barChartLabels: string[] = ['2021/03/01', '2021/03/02', '2021/03/03', '2021/03/04'];
  public barChartLabels: string[] = [];
  // 新增顏色 按照 barChartData 排序
  public barChartColors: Array<any> = [
    {
      //訂購金額
      backgroundColor: 'rgba(12, 92, 105,0.09)',
      borderColor: 'rgba(0, 204, 0,1)',
      borderWidth: 1,
    },
    {
      //退貨金額
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    },
    {
      //點擊次數
      backgroundColor: 'rgba(255,255,255,0.5)', //設定白色
      borderColor: 'rgba(255, 93, 0, 0.6)',
      borderWidth: 2
    }
  ]
  money: string[]=[];
  index: string[] = [];
  click: string[] = [];
  // events
  public chartClicked(e: any): void {
    if (e.active.length > 0) {
      const chart = e.active[0]._chart;
      const activePoints = chart.getElementAtEvent(e.event);
      if (activePoints.length > 0) {
        // get the internal index of slice in pie chart
        const clickedElementIndex = activePoints[0]._index;
        const label = chart.data.labels[clickedElementIndex];
        // get value by index
        const value = chart.data.datasets[0].data[clickedElementIndex];
        // console.log(clickedElementIndex, label, value)
      }
    }
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getData();
  }

  clearCharts() {
    this.barChartLabels = [];

  }

  public randomize(): void {
    // 修改陣列內容 依照barChartData 陣列裡的長度 增加
    this.barChartData[0].data = [  //訂購金額
      Math.round(Math.random() * 100000), // 對應到 this.barChartData[0] 的 80000
      Math.round(Math.random() * 100000), // 50000
      Math.round(Math.random() * 100000), // 66400
      Math.round(Math.random() * 100000), // 10000
      Math.round(Math.random() * 100000), // 66400
      Math.round(Math.random() * 100000), // 10000
    ];
    this.barChartData[1].data = [ //退貨金額
      Math.round(Math.random() * 25000),
      Math.round(Math.random() * 25000),
      Math.round(Math.random() * 25000),
      Math.round(Math.random() * 25000),
      Math.round(Math.random() * 25000),
      Math.round(Math.random() * 25000),
    ];
    this.barChartData[2].data = [ //點擊次數
      Math.round(Math.random() * 2500),
      Math.round(Math.random() * 2500),
      Math.round(Math.random() * 2500),
      Math.round(Math.random() * 2500),
      Math.round(Math.random() * 2500),
      Math.round(Math.random() * 2500),
    ];
  }

  getData() {
    return this.http.get('http://www.json-generator.com/api/json/get/bVWnyReTxe?indent=2').subscribe((res: any) => {
      console.log(res);
      for (let index = 0; index < res.data.length; index++) {
        const element = res.data[index].金額;
        const element2 = res.data[index].銷售日期;
        const element3 = res.data[index].數量;
        const element4 = res.data[index].clicks;
        this.money.push(element)
        this.barChartLabels.push(element2);
        this.index.push(element3)
        this.click.push(element4)
      }

      for (let i = 0; i <= this.money.length; i++) {
        const element = this.money[i];
        this.barChartData[0].data?.push(parseInt(element))
      }

      for (let i = 0; i < this.index.length; i++) {
        const element = this.index[i];
        this.barChartData[1].data?.push(parseInt(element))
      }

      for (let i = 0; i < this.click.length; i++) {
        const element = this.click[i];
        this.barChartData[2].data?.push(parseInt(element))
      }

      // for (let a = 0; a < res.time.result4.length; a++) {
      //   this.barChartLabels.push(res.time.result4[a].date);
      // }
      // 金額資料
      // var d1 = res.data.result[0].data;
      // var d2 = res.data.result2[0].data;
      // var d3 = res.data.result3[0].data;
      // label
      // var l1 = res.data.result[0].label;
      // var l2 = res.data.result2[0].label;
      // var l3 = res.data.result3[0].label;

      // this.barChartData[0].data = d1;
      // this.barChartData[1].data = d2;
      // this.barChartData[2].data = d3;

      // this.barChartData[0].label = l1;
      // this.barChartData[1].label = l2;
      // this.barChartData[2].label = l3;
    })
  }
}
