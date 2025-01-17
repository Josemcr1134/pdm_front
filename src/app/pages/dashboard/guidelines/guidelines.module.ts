import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuidelinesRoutingModule } from './guidelines-routing.module';
import { MainComponent } from './main/main.component';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    GuidelinesRoutingModule
  ]
})
export class GuidelinesModule { }
