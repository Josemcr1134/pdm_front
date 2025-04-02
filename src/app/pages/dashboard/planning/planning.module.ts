import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanningRoutingModule } from './planning-routing.module';
import { MainComponent } from './main/main.component';
import { AlertComponent } from '../../../shared/alert/alert.component';
import { LoaderComponent } from '../../../shared/loader/loader.component';
import { RouterModule } from '@angular/router';
import { DetailComponent } from './detail/detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from '../../../shared/pagination/pagination.component';
import { SearchPipe } from '../../../core/pipes/search.pipe';


@NgModule({
  declarations: [
    MainComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    PlanningRoutingModule,
    AlertComponent,
    LoaderComponent,
    RouterModule,
    FormsModule,
    PaginationComponent,
    ReactiveFormsModule,
    SearchPipe
  ]
})
export class PlanningModule { }
