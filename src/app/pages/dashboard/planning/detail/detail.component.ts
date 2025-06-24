import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlanningService } from '../../../../core/services/planning/planning.service';
import { AlertsService } from '../../../../core/services/alerts/alerts.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit {

  public productGoal:any;
  public filter:any;
  public bpin:string = '';
  public contractName:string = '';
  public isLoading:boolean = false;
  public toEdit:boolean = false;
  public toEditContractName:boolean = false;
  constructor(private activatedRoute:ActivatedRoute, private pdmSvc:PlanningService, private alertSvc:AlertsService){}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params:any) => {
      console.log(params)
      this.filter = params.filterByDpt;
    })
    this.productGoal = JSON.parse(sessionStorage.getItem('productGoal')|| '');
    this.bpin = this.productGoal.bpin
    this.contractName = this.productGoal.name_project
    console.log(this.productGoal)
  }


  updateBpin(){
    const data = {
      bpin: this.bpin
    };
    this.isLoading = !this.isLoading;
    this.pdmSvc.updateBpin(data, this.productGoal.id)
        .subscribe({
          error:(err:any) => {
            console.log(err);
            this.isLoading = !this.isLoading;
            this.alertSvc.handleErrors(err);
          },
          next:(resp:any) =>{
            this.toEdit = false;
            this.productGoal.bpin = this.bpin;
            sessionStorage.setItem('productGoal', JSON.stringify(this.productGoal));
            this.alertSvc.currentAlert('Éxito', 'Bpin actualizado', 'success')
          }
        });
  };


  updateNameProject(){
    const data = {
      name_project: this.contractName
    };
    this.isLoading = !this.isLoading;
    this.pdmSvc.updateNameProject(data, this.productGoal.id)
        .subscribe({
          error:(err:any) => {
            console.log(err);
            this.isLoading = !this.isLoading;
            this.alertSvc.handleErrors(err);
          },
          next:(resp:any) =>{
            this.toEdit = false;
            this.productGoal.name_project = this.contractName;
            sessionStorage.setItem('productGoal', JSON.stringify(this.productGoal));
            this.alertSvc.currentAlert('Éxito', 'Nombre de proyecto  actualizado', 'success')
          }
        });
  };



}

