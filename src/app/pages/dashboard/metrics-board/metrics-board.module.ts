import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MetricsBoardRoutingModule } from './metrics-board-routing.module';
import { MainComponent } from './main/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { StrategicLineChartComponent } from '../../../shared/strategic-line-chart/strategic-line-chart.component';
import { LoaderComponent } from '../../../shared/loader/loader.component';
import { PieChartComponent } from '../../../shared/pie-chart/pie-chart.component';
import { RubricExpenseSumChartComponent } from '../../../shared/rubric-expense-sum-chart/rubric-expense-sum-chart.component';
import { StrategicLineExpenseSumComponent } from '../../../shared/strategic-line-expense-sum/strategic-line-expense-sum.component';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    MetricsBoardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    StrategicLineChartComponent,
    LoaderComponent,
    PieChartComponent,
    StrategicLineExpenseSumComponent,
    RubricExpenseSumChartComponent
]
})
export class MetricsBoardModule { }
