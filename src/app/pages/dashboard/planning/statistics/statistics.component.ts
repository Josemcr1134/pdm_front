import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip
} from "ng-apexcharts";
import { PlanningService } from '../../../../core/services/planning/planning.service';
import { LoaderComponent } from '../../../../shared/loader/loader.component';

export type ChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  dataLabels: ApexDataLabels | any;
  plotOptions: ApexPlotOptions | any;
  yaxis: ApexYAxis | any;
  xaxis: ApexXAxis | any;
  fill: ApexFill | any;
  tooltip: ApexTooltip | any;
  stroke: ApexStroke | any;
  legend: ApexLegend | any;
};

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    LoaderComponent
  ],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent implements OnInit {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;
  public goalId:string ='';
  public isLoading:boolean = false;
  constructor(private pdmSvc:PlanningService) {

  }


  ngOnInit(): void {
    let productGoal = JSON.parse(sessionStorage.getItem('productGoal') || '');
    this.goalId = productGoal.id;
    this.getStatistics();
  };


  getStatistics(){
    this.isLoading = !this.isLoading;
    this.pdmSvc.getStatistics(this.goalId)
        .subscribe({
          error:(err:any) => {
            console.log(err);
            this.isLoading = !this.isLoading;
          },
          next:(resp:any) => {
            let years = resp.graphical_data_executed.map((g:any) =>  g.year);
            let data = [
              {
                name:'Meta ejecutada',
                data:resp.graphical_data_executed.map((g:any) =>  g.value)
              },
              {
                name:'Meta programada',
                data:resp.graphical_data_scheduled.map((g:any) =>  g.value)
              },
            ]
            this.loadChart(years, data)
            this.isLoading = !this.isLoading;
          }
        })
  }

  loadChart(years:any, series:any){
    this.chartOptions = {
      series: series,
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded"
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: years
      },

      fill: {
        opacity: 1
      },

    };
  }
}
