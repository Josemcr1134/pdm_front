import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecopRoutingModule } from './secop-routing.module';
import { ListComponent } from './list/list.component';
import { LoaderComponent } from '../../../shared/loader/loader.component';
import { PaginationComponent } from '../../../shared/pagination/pagination.component';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from '../../../shared/alert/alert.component';


@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    SecopRoutingModule,
    LoaderComponent,
    PaginationComponent,
    FormsModule,
    AlertComponent
  ]
})
export class SecopModule { }
