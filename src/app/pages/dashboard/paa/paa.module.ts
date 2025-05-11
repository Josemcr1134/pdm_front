import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PAARoutingModule } from './paa-routing.module';
import { ListComponent } from './list/list.component';
import { LoaderComponent } from '../../../shared/loader/loader.component';


@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    PAARoutingModule,
    LoaderComponent
  ]
})
export class PAAModule { }
