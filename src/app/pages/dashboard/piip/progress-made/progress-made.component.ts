import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { PiipService } from '../../../../core/services/piip/piip.service';
import { PlanningService } from '../../../../core/services/planning/planning.service';

@Component({
  selector: 'app-progress-made',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './progress-made.component.html',
  styleUrl: './progress-made.component.css'
})
export class ProgressMadeComponent implements OnInit {
  public codeSelected:any = null;
  public years:any =  null;
  public yearSelected:number = 2025;
  public isLoading:boolean = false;
  public progressMade:number = 0;
  ngOnInit(): void {
    this.codeSelected =   JSON.parse(localStorage.getItem('codeSelected')|| '');
    this.getProgressMade();
    this.getYears();
  }

  constructor(private piipSvc:PiipService, private pdmSvc:PlanningService){}

  getProgressMade(){
    this.isLoading = !this.isLoading;
    this.piipSvc.getProgressMade(this.codeSelected.id, this.yearSelected)
        .subscribe({
          error:(err:any) => {
            console.log(err);
            this.isLoading = !this.isLoading;
          },
          next:(resp:any) => {
            console.log(resp)
            this.progressMade = resp.period.value;
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
      value:this.progressMade,
      year:  this.yearSelected
    };
    this.isLoading = !this.isLoading;

    this.piipSvc.updateProgressMade(this.codeSelected.id, data)
        .subscribe({
          error:(err:any) => {
            this.isLoading = !this.isLoading;
            Swal.fire('Oooops', err.message, 'error');
          },
          next:(resp:any)=> {
            this.isLoading = !this.isLoading;
            Swal.fire('Éxito', 'Avance actualizado', 'success');
          }
        });
  };

}
