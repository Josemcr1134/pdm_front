import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpensesRoutingModule } from './expenses-routing.module';
import { FunctionalityComponent } from './functionality/functionality.component';
import { InvestmentsComponent } from './investments/investments.component';
import { MainComponent } from './main/main.component';
import { PaginationComponent } from '../../../shared/pagination/pagination.component';


@NgModule({
  declarations: [
    FunctionalityComponent,
    InvestmentsComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    ExpensesRoutingModule,
    PaginationComponent
  ]
})
export class ExpensesModule { }
