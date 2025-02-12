import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncomesRoutingModule } from './incomes-routing.module';
import { MainComponent } from './main/main.component';
import { PaginationComponent } from '../../../shared/pagination/pagination.component';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    IncomesRoutingModule,
    PaginationComponent
  ]
})
export class IncomesModule { }
