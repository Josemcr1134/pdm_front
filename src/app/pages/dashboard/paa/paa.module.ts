import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PAARoutingModule } from './paa-routing.module';
import { ListComponent } from './list/list.component';
import { LoaderComponent } from '../../../shared/loader/loader.component';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from '../../../shared/alert/alert.component';


@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    PAARoutingModule,
    LoaderComponent,
    FormsModule,
    AlertComponent
  ]
})
export class PAAModule { }
