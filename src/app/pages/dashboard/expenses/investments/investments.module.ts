import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvestmentsRoutingModule } from './investments-routing.module';
import { MainComponent } from './main/main.component';
import { DetailComponent } from './detail/detail.component';
import { LoaderComponent } from '../../../../shared/loader/loader.component';
import { AlertComponent } from '../../../../shared/alert/alert.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from '../../../../shared/pagination/pagination.component';


@NgModule({
  declarations: [
    MainComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    InvestmentsRoutingModule,
    LoaderComponent,
    AlertComponent,
    ReactiveFormsModule,
    FormsModule,
    PaginationComponent
  ]
})
export class InvestmentsModule { }
