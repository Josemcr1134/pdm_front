import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FunctionalityRoutingModule } from './functionality-routing.module';
import { DetailComponent } from './detail/detail.component';
import { MainComponent } from './main/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from '../../../../shared/loader/loader.component';
import { AlertComponent } from '../../../../shared/alert/alert.component';
import { ContractFormComponent } from '../../../../shared/contract-form/contract-form.component';
import { ContractListComponent } from '../../../../shared/contract-list/contract-list.component';


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
    AlertComponent,
    ContractFormComponent,
    ContractListComponent
  ]
})
export class FunctionalityModule { }
