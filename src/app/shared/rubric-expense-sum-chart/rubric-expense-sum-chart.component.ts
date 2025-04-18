import { CommonModule } from "@angular/common";
import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
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
  ApexTooltip,
  NgApexchartsModule
} from "ng-apexcharts";

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
  selector: 'app-rubric-expense-sum-chart',
  standalone: true,
  imports: [
    CommonModule,
    NgApexchartsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './rubric-expense-sum-chart.component.html',
  styleUrl: './rubric-expense-sum-chart.component.css'
})

export class RubricExpenseSumChartComponent implements OnInit {
  @Input() data:any;
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;

  constructor() { }

  ngOnInit(): void {
    this.chartOptions = {
      series: [
        {
          name: "Apropiación inicial",
          data: [this.data[0].initial_approval, this.data[1].initial_approval, this.data[2].initial_approval, this.data[3].initial_approval ]
        },
        {
          name: "Total apropiado",
          data: [this.data[0].total_approval, this.data[1].total_approval, this.data[2].total_approval, this.data[3].total_approval]
        },
        {
          name: "Compromisos",
          data: [this.data[0].previous_commitments, this.data[1].previous_commitments, this.data[2].previous_commitments, this.data[3].previous_commitments]
        },
        {
          name: "Obligaciones",
          data: [this.data[0].obligations, this.data[1].obligations, this.data[2].obligations, this.data[3].obligations]
        },
        {
          name: "Pagos",
          data: [this.data[0].accumulated_payments, this.data[1].accumulated_payments, this.data[2].accumulated_payments, this.data[3].accumulated_payments]
        },
        {
          name: "Saldo * Ejecutar",
          data: [this.data[0].total_approval - this.data[0].executed_balance, this.data[1].total_approval - this.data[1].executed_balance, this.data[2].total_approval - this.data[2].executed_balance, this.data[3].total_approval - this.data[3].executed_balance]
        }
      ],
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
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
        categories: ['2024', '2025', '2026', '2027']
      },
      yaxis: {
        title: {
          text: "$ (Pesos)"
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function(val:any) {
            return "$ " + val + " Pesos";
          }
        }
      }
    };
  }

}
