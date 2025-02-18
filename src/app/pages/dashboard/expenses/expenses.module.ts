import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpensesRoutingModule } from './expenses-routing.module';
import { MainComponent } from './main/main.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    ExpensesRoutingModule,
    FormsModule

  ]
})
export class ExpensesModule { }
