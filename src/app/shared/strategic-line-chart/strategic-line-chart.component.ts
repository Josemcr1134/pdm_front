import { CommonModule } from "@angular/common";
import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from "@angular/core";
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
  ApexStroke,
  NgApexchartsModule
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  dataLabels: ApexDataLabels | any;
  plotOptions: ApexPlotOptions | any;
  xaxis: ApexXAxis | any;
  stroke: ApexStroke | any;
};
@Component({
  selector: 'app-strategic-line-chart',
  standalone: true,
  imports: [
    CommonModule,
    NgApexchartsModule
  ],
  templateUrl: './strategic-line-chart.component.html',
  styleUrl: './strategic-line-chart.component.css'
})
export class StrategicLineChartComponent implements OnChanges {
  @Input() data:any[] = [];
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;

  ngOnChanges(changes: SimpleChanges): void {
     if (changes['data'] ) {
       let labels = this.data.map( d => d.name ||  d.description);
       let series1 = this.data.map( d => d.total_executed_goals || d.percent_executed);
       let series2 = this.data.map( d => d.total_pending_goals || d.percent_pending);
       this.buildChart(series1 , series2,  labels)
    }
  }

  constructor() { }

  buildChart(series1:any, series2:any ,labels:any){
     this.chartOptions = {
      series: [
        {
          name: "Ejecutado",
          data: series1
        },
        {
          name: "Pendiente",

          data: series2
        }
      ],
      chart: {
        type: "bar",
        height: 550
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            position: "top"
          }
        }
      },
      dataLabels: {
        enabled: true,
        offsetX: -6,
        style: {
          fontSize: "12px",
          colors: ["#6c69e9"]
        }
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["#fff"]
      },
      xaxis: {
        categories: labels
      }
    };
  }
}
