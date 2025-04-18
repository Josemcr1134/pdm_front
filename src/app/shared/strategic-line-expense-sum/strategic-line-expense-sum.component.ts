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
  selector: 'app-strategic-line-expense-sum',
  standalone: true,
  imports: [
    CommonModule,
    NgApexchartsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './strategic-line-expense-sum.component.html',
  styleUrl: './strategic-line-expense-sum.component.css'
})
export class StrategicLineExpenseSumComponent {
  @Input() data:any;
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;

  constructor() { }

  ngOnInit(): void {
    let initApproval2024 = this.data[0].strategic_lines.reduce((sum:any, item:any) => sum + item.initial_approval, 0);
    let initApproval2025 = this.data[1].strategic_lines.reduce((sum:any, item:any) => sum + item.initial_approval, 0);
    let initApproval2026 = this.data[2].strategic_lines.reduce((sum:any, item:any) => sum + item.initial_approval, 0);
    let initApproval2027 = this.data[3].strategic_lines.reduce((sum:any, item:any) => sum + item.initial_approval, 0);

    let totalApproval2024 = this.data[0].strategic_lines.reduce((sum:any, item:any) => sum + item.total_approval, 0);
    let totalApproval2025 = this.data[1].strategic_lines.reduce((sum:any, item:any) => sum + item.total_approval, 0);
    let totalApproval2026 = this.data[2].strategic_lines.reduce((sum:any, item:any) => sum + item.total_approval, 0);
    let totalApproval2027 = this.data[3].strategic_lines.reduce((sum:any, item:any) => sum + item.total_approval, 0);

    let obligations2024 = this.data[0].strategic_lines.reduce((sum:any, item:any) => sum + item.obligations, 0);
    let obligations2025 = this.data[1].strategic_lines.reduce((sum:any, item:any) => sum + item.obligations, 0);
    let obligations2026 = this.data[2].strategic_lines.reduce((sum:any, item:any) => sum + item.obligations, 0);
    let obligations2027 = this.data[3].strategic_lines.reduce((sum:any, item:any) => sum + item.obligations, 0);

    let commitments2024 = this.data[0].strategic_lines.reduce((sum:any, item:any) => sum + item.previous_commitments, 0);
    let commitments2025 = this.data[1].strategic_lines.reduce((sum:any, item:any) => sum + item.previous_commitments, 0);
    let commitments2026 = this.data[2].strategic_lines.reduce((sum:any, item:any) => sum + item.previous_commitments, 0);
    let commitments2027 = this.data[3].strategic_lines.reduce((sum:any, item:any) => sum + item.previous_commitments, 0);

    let payments2024 = this.data[0].strategic_lines.reduce((sum:any, item:any) => sum + item.accumulated_payments, 0);
    let payments2025 = this.data[1].strategic_lines.reduce((sum:any, item:any) => sum + item.accumulated_payments, 0);
    let payments2026 = this.data[2].strategic_lines.reduce((sum:any, item:any) => sum + item.accumulated_payments, 0);
    let payments2027 = this.data[3].strategic_lines.reduce((sum:any, item:any) => sum + item.accumulated_payments, 0);


      this.chartOptions = {
      series: [
        {
          name: "Apropiación inicial",
          data: [initApproval2024, initApproval2025, initApproval2026, initApproval2027 ]
        },
        {
          name: "Total apropiado",
          data: [totalApproval2024, totalApproval2025, totalApproval2026, totalApproval2027 ]
        },
        {
          name: "Compromisos",
          data: [commitments2024, commitments2025, commitments2026, commitments2027]
        },
        {
          name: "Obligaciones",
          data: [obligations2024, obligations2025, obligations2026, obligations2027]
        },
        {
          name: "Pagos",
          data: [payments2024, payments2025, payments2026, payments2027]
        },
        {
          name: "Saldo * Ejecutar",
          data: [35, 41, 36, 26]
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
        categories: this.data.map( (d:any) => d.year.toString())
      },
      yaxis: {
        title: {
          text: "$ (thousands)"
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function(val:any) {
            return "$ " + val + " thousands";
          }
        }
      }
    };
  }
  buildChart( ){


  }
}
