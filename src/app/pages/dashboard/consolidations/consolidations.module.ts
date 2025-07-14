import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsolidationsRoutingModule } from './consolidations-routing.module';
import { ListComponent } from './list/list.component';
import { PaginationComponent } from '../../../shared/pagination/pagination.component';
import { AlertComponent } from '../../../shared/alert/alert.component';
import { LoaderComponent } from '../../../shared/loader/loader.component';


@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    ConsolidationsRoutingModule,
    PaginationComponent,
    AlertComponent,
    LoaderComponent
  ]
})
export class ConsolidationsModule { }
