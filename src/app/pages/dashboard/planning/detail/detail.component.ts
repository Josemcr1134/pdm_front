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
    this.listenContractRouteParams();
    this.productGoal = JSON.parse(sessionStorage.getItem('productGoal') || '');
    this.bpin = this.productGoal.bpin
    this.contractName = this.productGoal.name_project
  }

  ngOnDestroy(): void {
    this.childRouteSub?.unsubscribe();
  }

  private listenContractRouteParams(): void {
    // Capture current child params (if already on the contracts route).
    this.updateContractParams(this.activatedRoute.firstChild?.snapshot?.params);

    // Keep listening for child route param changes while this component is alive.
    this.childRouteSub = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      switchMap(() => this.activatedRoute.firstChild?.params ?? of({}))
    ).subscribe((params: any) => this.updateContractParams(params));
  }

  private updateContractParams(params: any): void {
    if (!params) {
      this.supervisorName = '';
      this.contractingUnity = '';
      this.contractId = '';
      this.responsibleEmail = '';
      this.responsiblePhone = '';
      this.toEditSupervisorName = false;
      this.toEditContractingUnity = false;
      return;
    }
    this.contractId = params.contractId || '';
    this.supervisorName = params.supervisorName || '';
    this.contractingUnity = params.contractingUnit || '';
    this.responsibleEmail = params.responsibleEmail || '';
    this.responsiblePhone = params.responsiblePhone || '';

    if (!this.contractId) {
      this.toEditSupervisorName = false;
      this.toEditContractingUnity = false;
    }
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



  updateContractingUnit() {
    if (!this.contractId) {
      this.alertSvc.currentAlert('Información', 'Selecciona un contrato para actualizar la unidad de contratación', 'info');
      return;
    }
    const data = {
      contracting_unit: this.contractingUnity
    };
    this.isLoading = !this.isLoading;
    this.pdmSvc.updateContractingUnit(data, this.contractId)
      .subscribe({
        error: (err: any) => {
          console.log(err);
          Swal.fire('Oooops', 'Error al actualizar la unidad de contratación', 'error');
          this.isLoading = !this.isLoading;
        },
        next: (resp: any) => {
          Swal.fire('Éxito', 'Unidad de contratación actualizada', 'success');
          this.isLoading = !this.isLoading;
          this.toEditContractingUnity = false;
        }
      })
  }

  updateSupevisorName() {
    if (!this.contractId) {
      this.alertSvc.currentAlert('Información', 'Selecciona un contrato para actualizar el supervisor', 'info');
      return;
    }
    const data = {
      name_responsible: this.supervisorName,
      responsible_email: this.responsibleEmail,
      responsible_phone: this.responsiblePhone
    };
    this.isLoading = !this.isLoading;
    this.pdmSvc.updateResponsableUser(data, this.contractId)
      .subscribe({
        error: (err: any) => {
          console.log(err);
          this.alertSvc.handleErrors(err);
          this.isLoading = !this.isLoading;
        },
        next: () => {
          this.toEditSupervisorName = false;
          this.isLoading = !this.isLoading;

          this.alertSvc.currentAlert('Éxito', 'Responsable actualizado', 'success');
        }
      });
  };



}
