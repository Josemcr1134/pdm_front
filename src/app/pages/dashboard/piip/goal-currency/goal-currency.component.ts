import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PiipService } from '../../../../core/services/piip/piip.service';
import { PlanningService } from '../../../../core/services/planning/planning.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-goal-currency',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

  ],
  templateUrl: './goal-currency.component.html',
  styleUrl: './goal-currency.component.css'
})
export class GoalCurrencyComponent implements OnInit {
  public codeSelected:any = null;
  public years:any =  null;
  public yearSelected:number = 2024;
  public isLoading:boolean = false;
  public goalCurrency:number = 0;
  ngOnInit(): void {
    this.codeSelected =   JSON.parse(localStorage.getItem('codeSelected')|| '');
    this.getGoalCurrency();
    this.getYears();
  }

  constructor(private piipSvc:PiipService, private pdmSvc:PlanningService){}

  getGoalCurrency(){
    this.isLoading = !this.isLoading;
    this.piipSvc.getGoalConcurrency(this.codeSelected.id, this.yearSelected)
        .subscribe({
          error:(err:any) => {
            console.log(err);
            this.isLoading = !this.isLoading;
          },
          next:(resp:any) => {
            console.log(resp)
            this.goalCurrency = resp.period.value;
            this.isLoading = !this.isLoading;
          }
        });
  };

  getYears(){
    this.isLoading = !this.isLoading;
    this.pdmSvc.getYears()
        .subscribe({
          error:(err:any) => {
            console.log(err);
            this.isLoading = !this.isLoading;
          },
          next:(resp:any) => {
            this.years = resp;
            this.yearSelected = resp.first_year;
            this.isLoading = !this.isLoading;

          }
        });
  };

  handleGoalChange() {
    const data = {
      value:this.goalCurrency,
      year:  this.yearSelected
    };
    this.isLoading = !this.isLoading;

    this.piipSvc.updateGoalConcurrency(this.codeSelected.id, data)
        .subscribe({
          error:(err:any) => {
            this.isLoading = !this.isLoading;
            Swal.fire('Oooops', err.message, 'error');
          },
          next:(resp:any)=> {
            this.isLoading = !this.isLoading;
            Swal.fire('Éxito', 'Meta actualizada', 'success');
          }
        })
  }
}
