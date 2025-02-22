import { Component, OnInit } from '@angular/core';
import { PlanningService } from '../../../../core/services/planning/planning.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../../../../shared/loader/loader.component';
import { AlertsService } from '../../../../core/services/alerts/alerts.service';

@Component({
  selector: 'app-scheduled-goal',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,

  ],
  templateUrl: './scheduled-goal.component.html',
  styleUrl: './scheduled-goal.component.css'
})
export class ScheduledGoalComponent implements OnInit{
  public yearSelected:number = 0;
  public years:any;
  public goalId:string ='';
  public initApproval:number = 0;
  public goal:number = 0;
  public sourcesSelected:any[] = [];
  constructor(private pdmSvc: PlanningService, private alertSvc:AlertsService){}

  ngOnInit(): void {
    let productGoal = JSON.parse(sessionStorage.getItem('productGoal') || '');
    this.goalId = productGoal.id;
    console.log(this.goalId)
    this.getYears();

  }


  getScheduledGoals(){
      this.pdmSvc.getScheduledGoal(this.goalId, this.yearSelected)
          .subscribe({
            error:(err:any) => {
              console.log(err);
            },
            next:(resp:any) => {
              console.log(resp)
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
            this.getScheduledGoals();
          }
        });
  };


  updateScheduledGoal(){
    const data ={
      value: this.goal
    };

    this.pdmSvc.updateGoalScheduled(this.goalId, this.yearSelected, data)
          .subscribe({
            error:(err:any) => {
              this.alertSvc.handleErrors(err);
            },
            next:(resp:any) => {
              this.alertSvc.currentAlert('Éxito', 'Meta programada actualizada', 'success');
            }
          });
  };
}
