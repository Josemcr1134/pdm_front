import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from '../../../../shared/alert/alert.component';
import { LoaderComponent } from '../../../../shared/loader/loader.component';
import { PiipService } from '../../../../core/services/piip/piip.service';
import { PlanningService } from '../../../../core/services/planning/planning.service';

@Component({
  selector: 'app-deliverable-activities',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AlertComponent,
    LoaderComponent
  ],
  templateUrl: './deliverable-activities.component.html',
  styleUrl: './deliverable-activities.component.css'
})
export class DeliverableActivitiesComponent implements OnInit {
  public codeSelected:any = null;
  public yearSelected:number = 2025;
  public years:any = null;
  public isLoading:boolean = false;
  public deliverableActivities:any[] = [];
  constructor(private piipSvc:PiipService, private pdmSvc:PlanningService) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.codeSelected = JSON.parse(localStorage.getItem('codeSelected') || '');
    this.codeSelected.id = 'cc473dc5-7349-47d4-8783-6c825651b9d1';
    this.getYears();
    this.getDeliverableActivities()
  }

  getDeliverableActivities(){
    this.isLoading = !this.isLoading;
    this.piipSvc.getDeliverableActivity(this.yearSelected, this.codeSelected.id)
      .subscribe({
        error:(err:any) => {
          console.log(err);
          this.isLoading = !this.isLoading;
        },
        next:(resp:any) => {
          console.log(resp)
          this.deliverableActivities = resp;
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


}
