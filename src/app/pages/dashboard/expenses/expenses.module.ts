import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpensesRoutingModule } from './expenses-routing.module';
import { MainComponent } from './main/main.component';
import { PaginationComponent } from '../../../shared/pagination/pagination.component';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from '../../../shared/loader/loader.component';
import { AlertComponent } from '../../../shared/alert/alert.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailComponent } from './detail/detail.component';


@NgModule({
  declarations: [
    MainComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    ExpensesRoutingModule,
    PaginationComponent,
    RouterModule,
    LoaderComponent,
    AlertComponent,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ExpensesModule { }
