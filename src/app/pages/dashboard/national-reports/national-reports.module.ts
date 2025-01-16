import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NationalReportsRoutingModule } from './national-reports-routing.module';
import { MainComponent } from './main/main.component';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    NationalReportsRoutingModule
  ]
})
export class NationalReportsModule { }
