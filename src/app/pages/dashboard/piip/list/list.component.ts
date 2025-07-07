import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PiipService } from '../../../../core/services/piip/piip.service';
import { Router, RouterModule } from '@angular/router';
import { PlanningService } from '../../../../core/services/planning/planning.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {

  public  Sectors:any[] = [];
  public Bpins:any[] = [];
  public specificObjectives:any[] = [];
  public productsCode:any[] = [];

  public sectorSelected:string = '';
  public bpinSelected:string = '';
  public objectiveSelected:string = '';
  public codeSelected:any = '';

  public isLoading:boolean = false;
  public searchProductCode:string = '';
  public developmentPlan:any;
  constructor(private piipSvc:PiipService, private router:Router, private planningSvc:PlanningService){}

  ngOnInit(): void {
    this.getSectors();
    this.getDevelopmentPlan(false);
  };

  getSectors(){
    this.isLoading = !this.isLoading;
    this.piipSvc.getSectors()
      .subscribe({
        error:(err:any) => {
          this.isLoading = !this.isLoading;
        },
        next:(resp:any) => {
          this.Sectors = resp.results;
          this.isLoading = !this.isLoading;
          this.bpinSelected = '';
          this.objectiveSelected = '';
          this.codeSelected = '';
          this.searchProductCode = '';
        }
      });
  };

  getBpins(sector:string){
    this.sectorSelected = sector;
    this.isLoading = !this.isLoading;
    this.piipSvc.getBpinBySector(this.sectorSelected)
          .subscribe({
            error:(err:any) => {
              this.isLoading = !this.isLoading;
            },
            next:(resp:any) => {
              this.Bpins = resp.results;
              this.isLoading = !this.isLoading;
              this.bpinSelected = '';
              this.objectiveSelected = '';
              this.codeSelected = '';
              this.searchProductCode = '';
            }
          });
  };

  getObjectives(bpin:string){
    this.bpinSelected = bpin;
    this.isLoading = !this.isLoading;
    this.piipSvc.getSpecificObjectiveByBpin(this.bpinSelected)
          .subscribe({
            error:(err:any) => {
              this.isLoading = !this.isLoading;
            },
            next:(resp:any) => {
              this.specificObjectives = resp.results;
              this.isLoading = !this.isLoading;
              this.codeSelected = '';
              this.searchProductCode = '';
            }
          });
  };

  getProductCodes(objective:string){
    this.objectiveSelected = objective;
    this.isLoading = !this.isLoading;
     this.piipSvc.getCodeProduct(this.objectiveSelected, this.searchProductCode)
          .subscribe({
            error:(err:any) => {
              this.isLoading = !this.isLoading;
            },
            next:(resp:any) => {
              this.productsCode = resp.results;
              this.isLoading = !this.isLoading;
            }
          });
  };

  goToDetail(){
    localStorage.setItem('codeSelected', JSON.stringify(this.codeSelected));
    this.router.navigateByUrl('/dashboard/piip/detail/' + this.codeSelected.id);

  }


  getDevelopmentPlan(filter:boolean){
    this.planningSvc.getDevelopmentPlan(filter)
        .subscribe({
          error:(err:any) => {
            console.log(err);
          },
          next:(resp:any) => {
            this.developmentPlan = resp;
          }
        });
  };
}
