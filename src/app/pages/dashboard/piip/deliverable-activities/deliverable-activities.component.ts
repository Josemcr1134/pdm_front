import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from '../../../../shared/alert/alert.component';
import { LoaderComponent } from '../../../../shared/loader/loader.component';
import { PiipService } from '../../../../core/services/piip/piip.service';
import { PlanningService } from '../../../../core/services/planning/planning.service';
import { AlertsService } from '../../../../core/services/alerts/alerts.service';

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
  public totals:any;
  constructor(private piipSvc:PiipService, private pdmSvc:PlanningService, private alertSvc:AlertsService) { }

  ngOnInit(): void {
    this.codeSelected = JSON.parse(localStorage.getItem('codeSelected') || '');
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
          this.deliverableActivities = resp.activities ;
          this.totals = resp.totals_code_product;
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

  updateDeliverableActivity(data:any, activity:string){
    this.isLoading = !this.isLoading;
    delete data.id;
    this.piipSvc.updateDeliverableActivity(data, activity)
        .subscribe({
          error:(err:any) => {
            console.log(err);
            this.alertSvc.handleErrors(err);
            this.isLoading = !this.isLoading;
          },
          next:(resp:any) => {
            this.alertSvc.currentAlert('Éxito', 'Actividad actualizada', 'success')
            this.isLoading = !this.isLoading;
            setTimeout(() => {
              location.reload()

            }, 2000);
          }
        })
  }

}
