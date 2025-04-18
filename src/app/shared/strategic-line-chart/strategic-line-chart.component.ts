import { CommonModule } from "@angular/common";
import { Component, Input, OnInit, ViewChild } from "@angular/core";
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
  NgApexchartsModule
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  dataLabels: ApexDataLabels | any;
  plotOptions: ApexPlotOptions | any;
  xaxis: ApexXAxis | any;
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
export class StrategicLineChartComponent implements OnInit {
  @Input() data:any[] = [];

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;

  constructor() {}

  ngOnInit(): void {
    let labels = this.data.map( d => d.name ||  d.description)
    let series = this.data.map( d => d.executed)
    this.buildChart(series,  labels)
  }

  buildChart(series:any, labels:any){
    this.chartOptions = {
      series: [
        {
          name: "Total aprobado por linea",
          data:series
        }
      ],
      chart: {
        type: "bar",
        height: 250,
      },
      plotOptions: {
        bar: {
          horizontal: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: labels
      },
    };
  }
}
