import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OperatingExpensesService } from '../../../../../core/services/operatingExpenses/operating-expenses.service';
import { AlertsService } from '../../../../../core/services/alerts/alerts.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from '../../../../../shared/loader/loader.component';

@Component({
  selector: 'app-add-rubric',
  templateUrl: './add-rubric.component.html',
  styleUrl: './add-rubric.component.css',
  standalone:true,
  imports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    LoaderComponent
  ]
})
export class AddRubricComponent {
  @Input() goalSelectedId:string = ''
  public code:string ='';
  public description:string = '';
  @Output() close = new EventEmitter<boolean>();
  public isLoading:boolean = false;
  constructor(private expensesSvc:OperatingExpensesService, private alertSvc:AlertsService){}

  addRubric(){
    const data = {
      code:this.code,
      description:this.description
    };
    if (this.code.length && this.description.length) {
      this.isLoading = !this.isLoading;
      this.expensesSvc.addRubric(data, this.goalSelectedId)
      .subscribe({
        error:(err:any) => {
          console.log(err);
          this.alertSvc.handleErrors(err);
          this.isLoading = !this.isLoading;
        },
        next:(resp:any) => {
          this.alertSvc.currentAlert('Éxito', 'Rubro generado', 'success');
          this.goAway();
          this.isLoading = !this.isLoading;
            }
          })
    } else {
      this.alertSvc.currentAlert('', 'Todos los campos son requeridos', 'warning');

    }
  };

  goAway(){
    this.close.emit(true);
  };
}
