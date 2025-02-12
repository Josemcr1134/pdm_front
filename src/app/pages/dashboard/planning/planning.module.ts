import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanningRoutingModule } from './planning-routing.module';
import { MainComponent } from './main/main.component';
import { AlertComponent } from '../../../shared/alert/alert.component';
import { LoaderComponent } from '../../../shared/loader/loader.component';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    PlanningRoutingModule,
    AlertComponent,
    LoaderComponent
  ]
})
export class PlanningModule { }
