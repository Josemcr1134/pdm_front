import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpensesRoutingModule } from './expenses-routing.module';
import { MainComponent } from './main/main.component';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from '../../../shared/loader/loader.component';



@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    ExpensesRoutingModule,
    FormsModule,
    LoaderComponent

  ]
})
export class ExpensesModule { }
