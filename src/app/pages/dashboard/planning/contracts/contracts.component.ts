import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PlanningService } from '../../../../core/services/planning/planning.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PaginationComponent } from '../../../../shared/pagination/pagination.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertsService } from '../../../../core/services/alerts/alerts.service';
import { LoaderComponent } from '../../../../shared/loader/loader.component';
import { SourceFinancingService } from '../../../../core/services/sourceFinancing/source-financing.service';
import { AuthService } from '../../../../core/services/auth/auth.service';
import Swal from 'sweetalert2';
import { ContractFormComponent } from '../../../../shared/contract-form/contract-form.component';

@Component({
  selector: 'app-contracts',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PaginationComponent,
    LoaderComponent,
    ReactiveFormsModule,
    FormsModule,
    ContractFormComponent
  ],
  templateUrl: './contracts.component.html',
  styleUrl: './contracts.component.css'
})
export class ContractsComponent implements OnInit {
  public yearSelected: number = 2024;
  public years: any;
  public goalId: string = '';
  public showAddContractModal: boolean = false;

  public catalogProducts: any[] = [];
  public modalities: any[] = [];
  public catalogProductsSelected: any[] = [];
  public wellnessCatalogueSelected: any[] = [];
  public wellnessCatalogue: any[] = [];
  public contractExecutions: any[] = [];
  public contracts: any[] = [];
  public contractsLimit: number = 10;
  public contractsOffset: number = 0;

  public isLoading: boolean = false;
  public showAddSourceModal: boolean = false;
  public contractSelected: any;
  public productGoal: any;
  public productSelected: string = '';
  public sourceSelected: any = undefined;
  public filterByHomologation: boolean = false;
  public searchSources: string = '';
  public sourcesFinancing: any[] = [];
  public contractSourceValue: number = 0;
  public contractSourceAdditionValue: number = 0;
  public companyUser: string = '';
  public productMgaCode: string = '';
  public filter: boolean = false;
  constructor(private router: Router, private authSvc: AuthService, private sourceFinancingSvc: SourceFinancingService, private alertSvc: AlertsService, private pdmSvc: PlanningService, private activatedRoute: ActivatedRoute, private fb: FormBuilder) { }


  ngOnInit(): void {
    this.productGoal = JSON.parse(sessionStorage.getItem('productGoal') || '');
    this.goalId = this.productGoal.id;
    this.filter = this.activatedRoute.parent?.parent?.snapshot.params['filterByDpt'] || '';
    this.activatedRoute.params.subscribe((params: any) => {
      this.productMgaCode = params.codeProductMga;
      this.cleanRouteIfNoContractSelected(
        params.contractId,
        params.contractingUnit,
        params.supervisorName,
        params.responsibleEmail,
        params.responsiblePhone
      );
    });
    this.getYears();
    this.getUser();
    this.getSourceFinancing();
    this.getModality();
    this.getContractExecutionUnit();
  }

  private cleanRouteIfNoContractSelected(contractId: any, contractingUnit: any, supervisorName: any, responsibleEmail: any, responsiblePhone: any): void {
    if (!this.filter || !this.productMgaCode || !this.goalId) {
      return;
    }
    // If we landed here without a contract selected, wipe the contracting/supervisor params from the URL.
    const sanitizedContractId = (!contractId || contractId === 'null') ? '' : contractId;
    const sanitizedContractingUnit = (!contractingUnit || contractingUnit === 'null') ? '' : contractingUnit;
    const sanitizedSupervisorName = (!supervisorName || supervisorName === 'null') ? '' : supervisorName;
    const sanitizedResponsibleEmail = (!responsibleEmail || responsibleEmail === 'null') ? '' : responsibleEmail;
    const sanitizedResponsiblePhone = (!responsiblePhone || responsiblePhone === 'null') ? '' : responsiblePhone;

    if (
      contractId !== sanitizedContractId ||
      contractingUnit !== sanitizedContractingUnit ||
      supervisorName !== sanitizedSupervisorName ||
      responsibleEmail !== sanitizedResponsibleEmail ||
      responsiblePhone !== sanitizedResponsiblePhone
    ) {
      this.router.navigate([
        '/dashboard/planning',
        this.filter,
        'detail',
        this.goalId,
        'contracts',
        this.productMgaCode,
        sanitizedContractId,
        sanitizedContractingUnit,
        sanitizedSupervisorName,
        sanitizedResponsibleEmail,
        sanitizedResponsiblePhone
      ], { replaceUrl: true });
    }
  }


  getYears() {
    this.isLoading = !this.isLoading
    this.pdmSvc.getYears()
      .subscribe({
        error: (err: any) => {
          console.log(err);
          this.isLoading = !this.isLoading
        },
        next: (resp: any) => {
          this.years = resp;
          this.yearSelected = resp.first_year;
          this.isLoading = !this.isLoading
          this.getContracts();
        }
      });
  };

  getModality() {
    this.pdmSvc.getModality(1000, 0)
      .subscribe({
        error: (err: any) => {
          console.log(err);
        },
        next: (resp: any) => {
          console.log(resp)
          this.modalities = resp.results;
        }
      });
  };


  getContracts(event: boolean = false) {
    this.isLoading = !this.isLoading;
    this.pdmSvc.getContracts(this.contractsLimit, this.contractsOffset, this.yearSelected, this.goalId)
      .subscribe({
        error: (err: any) => {
          console.log(err);
          this.isLoading = !this.isLoading;
        },
        next: (resp: any) => {
          this.contracts = resp.results;
          console.log(resp)
          this.showAddContractModal = false;
          this.isLoading = !this.isLoading;
        }
      });
  };

  onPageChangeContractList(event: number) {
    this.contractsOffset = event;
    this.getContracts();
  };

  getContractById(id: string) {
    this.isLoading = !this.isLoading;
    this.pdmSvc.getContractById(id)
      .subscribe({
        error: (err: any) => {
          console.log(err);
          this.isLoading = !this.isLoading;
        },
        next: (resp: any) => {
          this.contractSelected = resp;
          console.log(this.contractSelected)
          this.contractSelected.products_contracted.forEach((p: any) => {
            p.product_contracted.catalogue_ccpet.isCollapsed = false;
            p.product_contracted.catalogue_central.isCollapsed = false;
            p.product_contracted.catalogue_ciuu.isCollapsed = false;
            p.product_contracted.catalogue_law.isCollapsed = false;
            p.product_contracted.catalogue_normativity.isCollapsed = false;
            p.product_contracted.catalogue_object_inversion.isCollapsed = false;
            p.product_contracted.catalogue_ods.isCollapsed = false;
            p.product_contracted.catalogue_plan.isCollapsed = false;
            p.product_contracted.catalogue_politics.isCollapsed = false;
            p.product_contracted.catalogue_sector.isCollapsed = false;
            p.product_contracted.catalogue_sector_program.isCollapsed = false;
            p.product_contracted.catalogue_wellness.isCollapsed = false;
          });
          const contractingUnit = (typeof this.contractSelected.contracting_unit === 'object' && this.contractSelected.contracting_unit !== null)
            ? (this.contractSelected.contracting_unit.name || this.contractSelected.contracting_unit.id || 'null')
            : (this.contractSelected.contracting_unit || 'null');
          const nameResponsible = this.contractSelected.name_responsible || 'null';
          const responsibleEmail = this.contractSelected.responsible_email || 'null';
          const responsiblePhone = this.contractSelected.responsible_phone || 'null';
          
          this.router.navigateByUrl(`/dashboard/planning/${this.filter}/detail/${this.goalId}/contracts/${this.productMgaCode}/${this.contractSelected.id}/${contractingUnit}/${nameResponsible}/${responsibleEmail}/${responsiblePhone}`);
          this.isLoading = !this.isLoading;
        }
      });
  };

  addSourceFinancing() {
    const data = {
      contract_product_contracted: this.productSelected,
      source_financing: this.sourceSelected.id,
      value: this.contractSourceValue,
      additional_value: this.contractSourceAdditionValue
    };

    this.isLoading = !this.isLoading;
    this.pdmSvc.addSourceFinancing(data)
      .subscribe({
        error: (err: any) => {
          this.alertSvc.handleErrors(err);
          this.isLoading = !this.isLoading;
        },
        next: (resp: any) => {
          this.alertSvc.currentAlert('Éxito', 'Fuente de financiamiento agregada', 'success');
          this.showAddSourceModal = false;
          this.searchSources = '';
          this.contractSourceValue = 0;
          this.sourceSelected = undefined;
          this.isLoading = !this.isLoading;
          this.getContractById(this.contractSelected.id)
        }
      });
  };

  deleteSourceFinancing(id: string) {
    this.isLoading = !this.isLoading;
    this.pdmSvc.deleteSourceFinancing(id)
      .subscribe({
        error: (err: any) => {
          this.isLoading = !this.isLoading;
          this.alertSvc.handleErrors(err);
        },
        next: (resp: any) => {
          this.isLoading = !this.isLoading;
          this.alertSvc.currentAlert('Éxito', 'Fuente de financiación eliminado', 'success');
          this.getContractById(this.contractSelected.id);
        }
      })
  }

  showAddSource(product: string) {
    this.showAddSourceModal = true;
    this.productSelected = product;
  };

  getSourceFinancing() {
    console.log(this.yearSelected)
    this.sourceFinancingSvc.getSourceFinancingByGoal(this.goalId, this.yearSelected)
      .subscribe({
        error: (err: any) => {
          this.alertSvc.handleErrors(err);
        },
        next: (resp: any) => {
          console.log(resp)
          this.sourcesFinancing = resp;
        }
      });
  };

  downloadProduct(productId: string) {
    this.isLoading = !this.isLoading;
    const data = {
      contract_product_contracted_id: this.contractSelected.id,
      year: this.yearSelected
    }
    this.pdmSvc.createContractDownloadable(data)
      .subscribe({
        error: (err: any) => {
          console.log(err);
          this.alertSvc.handleErrors(err);
          this.isLoading = !this.isLoading;
        },
        next: (resp: any) => {
          console.log(resp);
          setTimeout(() => {
            this.pdmSvc.getContractDownloadable(resp.id)
              .subscribe({
                error: (err: any) => {
                  this.alertSvc.handleErrors(err);
                  this.isLoading = !this.isLoading;

                },
                next: (resp: any) => {
                  this.isLoading = !this.isLoading;
                  window.open(resp.file, '_blank')
                  console.log(resp)
                }
              })
          }, 3000);
        }
      });
  };

  deleteContract(contractId: string) {
    this.isLoading = !this.isLoading;
    this.pdmSvc.deleteContract(contractId)
      .subscribe({
        error: (err: any) => {
          this.isLoading = !this.isLoading;
          this.alertSvc.handleErrors(err);
        },
        next: (resp: any) => {
          this.isLoading = !this.isLoading;
          this.alertSvc.currentAlert('Éxito', 'Contrato eliminado', 'success');
          this.getContracts();
        }
      })
  };

  updateContract() {
    this.isLoading = !this.isLoading;
    const data = {
      "object": this.contractSelected.object,
      "modality": this.contractSelected.modality.id,
      "start_date": this.contractSelected.start_date,
      "end_date": this.contractSelected.end_date,
      "executing_unit": this.contractSelected.executing_unit.id,
    };


    this.pdmSvc.updateContract(this.contractSelected.id, data)
      .subscribe({
        error: (err: any) => {
          this.isLoading = !this.isLoading;
          console.log(err);
          this.alertSvc.handleErrors(err);
        },
        next: (resp: any) => {
          console.log(resp)
          this.isLoading = !this.isLoading;
          this.alertSvc.currentAlert('Éxito', 'Contrato actualizado', 'success');
          this.getContractById(this.contractSelected.id);
        }
      });
  };




  getUser() {
    this.authSvc.getUserInfo()
      .subscribe({
        error: (err: any) => {
          console.log(err);
        },
        next: (resp: any) => {
          this.companyUser = resp.company.id;
        }
      });
  };

  getTotalForSelectedArray(array: any[]): number {
    return array.reduce((acc: number, item: any) => acc + (item.value + item.additional_value || 0), 0);
  }

  getTotalFor(): number {
    return this.contractSelected.products_contracted.reduce((acc: number, item: any) => {
      const total = item?.contract_product_contracted_source_financing?.reduce(

        (sum: number, source: any) => sum + (source.value + source.additional_value || 0),
        0
      );
      return acc + (total || 0);
    }, 0);
  };

  refresh() {
    this.getContracts()
    this.getSourceFinancing();
  }


  getContractExecutionUnit() {
    this.pdmSvc.getContractExecutionUnits(10, 0)
      .subscribe({
        error: (err: any) => {
          console.log(err);
        },
        next: (resp: any) => {
          this.contractExecutions = resp.results;
        }
      });
  };


}
