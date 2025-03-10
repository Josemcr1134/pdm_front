import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlanningService } from '../../../../core/services/planning/planning.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AlertsService } from '../../../../core/services/alerts/alerts.service';

@Component({
  selector: 'app-executed-goal',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './executed-goal.component.html',
  styleUrl: './executed-goal.component.css'
})
export class ExecutedGoalComponent implements OnInit {
  public yearSelected:number = 0;
  public years:any;
  public goalId:string ='';
  public initApproval:number = 0;
  public goal:number = 0;
  public sourcesSelected:any[] = [];
  public hasGoal:boolean = false;
  constructor(private pdmSvc: PlanningService, private alertSvc:AlertsService){}

  ngOnInit(): void {
    let productGoal = JSON.parse(sessionStorage.getItem('productGoal') || '');
    this.goalId = productGoal.id;
    this.getYears();

  }


  getExecutedGoals(){
      this.pdmSvc.getExecutedGoal(this.goalId, this.yearSelected)
          .subscribe({
            error:(err:any) => {
              console.log(err);
              this.hasGoal = false;
              console.log(this.hasGoal)
            },
            next:(resp:any) => {
              this.hasGoal = true;
              this.initApproval = resp.initial_approval;
              this.goal = resp.period.value;
              this.sourcesSelected = resp.source_financing;
            }
          })
  }

  getYears(){
    this.pdmSvc.getYears()
        .subscribe({
          error:(err:any) => {
            console.log(err);
          },
          next:(resp:any) => {
            this.years = resp;
            this.yearSelected = resp.first_year;
            this.getExecutedGoals();
          }
        });


  };

  // Método para sumar cada propiedad
  getTotalForProperty(property: string): number {
    return this.sourcesSelected.reduce((total, item) => total + (item[property]?.value || 0), 0);
  };

  handleGoalChange(){
    const data ={
      value: this.goal
    };
    if (this.hasGoal) {
      this.updateExecutedGoal(data);
    } else {
      this.createExecutedGoal(data);
    }
  };

  createExecutedGoal(data:{}){
    this.pdmSvc.createGoalExecuted(this.goalId, this.yearSelected, data)
      .subscribe({
        error:(err:any) => {
          this.alertSvc.handleErrors(err);
        },
        next:(resp:any) => {
          this.alertSvc.currentAlert('Éxito', 'Meta ejecutada creada', 'success');
          this.getExecutedGoals();
        }
      });
  };

  updateExecutedGoal(data:{}){
    this.pdmSvc.updateGoalExecuted(this.goalId, this.yearSelected, data)
      .subscribe({
        error:(err:any) => {
          this.alertSvc.handleErrors(err);
        },
        next:(resp:any) => {
          this.alertSvc.currentAlert('Éxito', 'Meta ejecutada actualizada', 'success');
          this.getExecutedGoals();
        }
      });
  };
}
