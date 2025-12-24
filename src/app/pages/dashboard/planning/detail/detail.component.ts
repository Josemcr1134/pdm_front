import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { PlanningService } from '../../../../core/services/planning/planning.service';
import { AlertsService } from '../../../../core/services/alerts/alerts.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit, OnDestroy {

  public productGoal: any;
  public filter: any;
  public bpin: string = '';
  public contractName: string = '';
  public isLoading: boolean = false;
  public toEdit: boolean = false;
  public toEditContractName: boolean = false;
  public toEditSupervisorName: boolean = false;
  public toEditContractingUnity: boolean = false;

  public supervisorName: string = '';
  public contractingUnity: string = '';
  public responsibleEmail: string = '';
  public responsiblePhone: string = '';
  public contractId: string = '';
  private childRouteSub?: Subscription;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private pdmSvc: PlanningService, private alertSvc: AlertsService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      this.filter = params.filterByDpt;
    });
    this.productGoal = JSON.parse(sessionStorage.getItem('productGoal') || '');
    this.bpin = this.productGoal.bpin
    this.contractName = this.productGoal.name_project
  }

  ngOnDestroy(): void {
    this.childRouteSub?.unsubscribe();
  }




  updateBpin() {
    const data = {
      bpin: this.bpin
    };
    this.isLoading = !this.isLoading;
    this.pdmSvc.updateBpin(data, this.productGoal.id)
      .subscribe({
        error: (err: any) => {
          console.log(err);
          this.isLoading = !this.isLoading;
          this.alertSvc.handleErrors(err);
        },
        next: (resp: any) => {
          this.toEdit = false;
          this.productGoal.bpin = this.bpin;
          sessionStorage.setItem('productGoal', JSON.stringify(this.productGoal));
          this.alertSvc.currentAlert('Éxito', 'Bpin actualizado', 'success')
        }
      });
  };


  updateNameProject() {
    const data = {
      name_project: this.contractName
    };
    this.isLoading = !this.isLoading;
    this.pdmSvc.updateNameProject(data, this.productGoal.id)
      .subscribe({
        error: (err: any) => {
          console.log(err);
          this.isLoading = !this.isLoading;
          this.alertSvc.handleErrors(err);
        },
        next: (resp: any) => {
          this.toEdit = false;
          this.productGoal.name_project = this.contractName;
          sessionStorage.setItem('productGoal', JSON.stringify(this.productGoal));
          this.alertSvc.currentAlert('Éxito', 'Nombre de proyecto  actualizado', 'success')
        }
      });
  };








}
