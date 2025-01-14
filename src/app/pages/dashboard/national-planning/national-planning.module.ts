import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NationalPlanningRoutingModule } from './national-planning-routing.module';
import { MainComponent } from './main/main.component';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    NationalPlanningRoutingModule
  ]
})
export class NationalPlanningModule { }
