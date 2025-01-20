import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegulationsRoutingModule } from './regulations-routing.module';
import { MainComponent } from './main/main.component';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    RegulationsRoutingModule
  ]
})
export class RegulationsModule { }
