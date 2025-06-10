import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries | any;
  chart: ApexChart | any;
  responsive: ApexResponsive[] | any;
  labels: any | any;
};



@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [
    CommonModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css'
})
export class PieChartComponent implements  OnChanges {
  @Input() pending: number = 0;
  @Input() executed: number = 0;

  chartOptions: any;

  ngOnChanges(changes: SimpleChanges): void {
    // Si cambian pending o executed, reconstruye el gráfico
    if (changes['pending'] || changes['executed']) {
      this.buildChart();
    }
  }

  buildChart() {
    this.chartOptions = {
      series: [this.executed, this.pending],
      chart: {
        width: 380,
        type: "pie"
      },
      labels: ['Total ejecutado', 'Pendiente por ejecutar'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }
}
