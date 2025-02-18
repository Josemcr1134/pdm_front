import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FunctionalityRoutingModule } from './functionality-routing.module';
import { DetailComponent } from './detail/detail.component';
import { MainComponent } from './main/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from '../../../../shared/loader/loader.component';
import { AlertComponent } from '../../../../shared/alert/alert.component';


@NgModule({
  declarations: [
    DetailComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    FunctionalityRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    LoaderComponent,
    AlertComponent
  ]
})
export class FunctionalityModule { }
