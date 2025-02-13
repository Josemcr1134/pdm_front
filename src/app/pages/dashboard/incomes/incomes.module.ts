import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncomesRoutingModule } from './incomes-routing.module';
import { MainComponent } from './main/main.component';
import { PaginationComponent } from '../../../shared/pagination/pagination.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from '../../../shared/loader/loader.component';
import { DetailComponent } from './detail/detail.component';


@NgModule({
  declarations: [
    MainComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    IncomesRoutingModule,
    PaginationComponent,
    FormsModule,
    LoaderComponent,
    ReactiveFormsModule
  ]
})
export class IncomesModule { }
