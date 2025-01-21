import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartamentalPlanningRoutingModule } from './departamental-planning-routing.module';
import { MainComponent } from './main/main.component';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    DepartamentalPlanningRoutingModule
  ]
})
export class DepartamentalPlanningModule { }
