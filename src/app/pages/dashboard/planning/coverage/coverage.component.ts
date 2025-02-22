import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoaderComponent } from '../../../../shared/loader/loader.component';
import { PaginationComponent } from '../../../../shared/pagination/pagination.component';
import { PlanningService } from '../../../../core/services/planning/planning.service';
import { FormsModule } from '@angular/forms';
import { AlertsService } from '../../../../core/services/alerts/alerts.service';

@Component({
  selector: 'app-coverage',
  standalone: true,
  imports: [
    CommonModule,
    LoaderComponent,
    PaginationComponent,
    FormsModule
  ],
  templateUrl: './coverage.component.html',
  styleUrl: './coverage.component.css'
})
export class CoverageComponent implements OnInit{
  public limit:number = 30;
  public offset:number = 0;
  public isLoading:boolean = false;
  public coverages:any[]=[];
  public productGoal:any;

  ngOnInit(): void {
    this.productGoal = JSON.parse(sessionStorage.getItem('productGoal')|| '');
    console.log(this.productGoal)
    this.getCoverage();
  }

  constructor(private pdmSvc:PlanningService, private alertSvc:AlertsService) {

  }

  getCoverage(){
    this.isLoading = !this.isLoading;
    this.pdmSvc.getCoverage(this.limit, this.offset, this.productGoal.id)
          .subscribe({
            error:(err:any) => {
              console.log(err);
              this.isLoading = !this.isLoading;
            },
            next:(resp:any) => {
              console.log(resp)
              this.coverages = resp.results;
              this.isLoading = !this.isLoading;
            }
          });
  };

  onPageChange(event:number){
    this.offset = event;
    this.getCoverage();
  };

  update(s:any){
    const data = {
        differential_approach: s.differential_approach,
        gender: s.gender,
        early_childhood: s.early_childhood,
        childhood: s.childhood,
        teen:  s.teen,
        youth:  s.youth,
        adulthood:  s.adulthood,
        old_age:  s.old_age,
        total_group:  s.total_group
    };

    this.isLoading = !this.isLoading;
    this.pdmSvc.updateCoverage(data, s.id)
        .subscribe({
          error:(err:any) => {
                this.isLoading = !this.isLoading;
                this.alertSvc.handleErrors(err);
          },
          next:(resp:any) => {
            this.isLoading = !this.isLoading;
            this.getCoverage();
            this.alertSvc.currentAlert('Éxito', 'Cobertura actualizada', 'success')
          }
        })
  }
}
