import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PlanningService } from '../../../../core/services/planning/planning.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PaginationComponent } from '../../../../shared/pagination/pagination.component';
import { ActivatedRoute } from '@angular/router';
import { AlertsService } from '../../../../core/services/alerts/alerts.service';
import { LoaderComponent } from '../../../../shared/loader/loader.component';
import { SourceFinancingService } from '../../../../core/services/sourceFinancing/source-financing.service';
import { AuthService } from '../../../../core/services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contracts',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PaginationComponent,
    LoaderComponent,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './contracts.component.html',
  styleUrl: './contracts.component.css'
})
export class ContractsComponent implements OnInit {
  public yearSelected:number = 2024;
  public years:any;
  public goalId:string ='';
  public showAddContractModal:boolean = false;
  public contractExecutionLimit:number = 10;
  public contractExecutionOffset:number = 0;
  public modalityLimit:number = 40;
  public modalityOffset:number = 0;
  public catalogProductLimit:number = 100;
  public catalogProductOffset:number = 0;
  public contractExecutions:{
    code:string,
    id:string,
    name:string
  }[] = [];
  public catalogProducts:any[] = [];
  public modalities:any[] = [];
  public catalogProductsSelected:any[] = [];
  public wellnessCatalogueSelected:any[] = [];
  public wellnessCatalogue:any[] = [];
  public contracts:any[] = [];
  public contractsLimit:number = 10;
  public contractsOffset:number = 0;
  public productMgaCode:string = '';
  public searchCatalogProducts:string = '';
  public searchCatalogWellness:string = '';
  contractForm!: FormGroup;
  public isLoading:boolean = false;
  public showAddSourceModal:boolean = false;
  public contractSelected:any;
  public productGoal:any;
  public productSelected:string = '';
  public sourceSelected:any = undefined;
  public filterByHomologation:boolean = false;
  public searchSources:string = '';
  public sourcesFinancing:any[] = [];
  public contractSourceValue:number = 0;
  public companyUser:string = '';
   constructor(private authSvc:AuthService, private sourceFinancingSvc:SourceFinancingService, private alertSvc:AlertsService, private pdmSvc:PlanningService, private activatedRoute:ActivatedRoute, private fb: FormBuilder){}


  ngOnInit(): void {
    this.productGoal = JSON.parse(sessionStorage.getItem('productGoal') || '');
    this.goalId = this.productGoal.id;
    this.activatedRoute.params.subscribe((params:any) => {
      this.productMgaCode = params.codeProductMga;
    });
    this.getYears();
    this.getContractExecutionUnit();
    this.getProductsContracts();
    this.getModality();
    this.getWellnessCatalogue();
    this.getUser();
    this.getSourceFinancing();
    this.contractForm = this.fb.group({
      object: ['', Validators.required],
      modality: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      year: [new Date().getFullYear(), [Validators.required, Validators.min(1900), Validators.max(32767)]],
      goal: ['', Validators.required],
      executing_unit: ['', Validators.required]
    });
    this.contractForm.get('goal')?.setValue(this.goalId);
  }


  getYears(){
    this.isLoading = !this.isLoading
    this.pdmSvc.getYears()
        .subscribe({
          error:(err:any) => {
            console.log(err);
            this.isLoading = !this.isLoading
          },
          next:(resp:any) => {
            this.years = resp;
            this.contractForm.get('year')?.setValue(resp.first_year);
            this.yearSelected = resp.first_year;
            this.isLoading = !this.isLoading
            this.getContracts();
          }
        });
  };

  getContractExecutionUnit(){
    this.pdmSvc.getContractExecutionUnits(this.contractExecutionLimit, this.contractExecutionOffset)
        .subscribe({
          error:(err:any) => {
            console.log(err);
          },
          next:(resp:any) => {
            console.log(resp);
            this.contractExecutions = resp.results;
          }
        });
  };

  onPaginateContractExecution(event:number){
    this.contractExecutionOffset = event;
    this.getContractExecutionUnit();
  };

  getProductsContracts(){
     this.pdmSvc.getCatalogProduct(this.productMgaCode, this.catalogProductLimit, this.catalogProductOffset , this.searchCatalogProducts)
        .subscribe({
          error:(err:any) => {
            console.log(err);
          },
          next:(resp:any) => {
            console.log(resp);
            this.catalogProducts = resp.results;
          }
        })
  };

  chooseProduct(id:string, description:string){
    const productSelected = this.catalogProductsSelected.find ( p => p.id == id)
    if (productSelected) {
      Swal.fire('Ooops', 'Producto ya fue seleccionado', 'info')
    } else {

      this.catalogProductsSelected.push({id:id, description:description});
    }
  };

  chooseWellnessCatalogue(id:string, code:string, name:string){
    const productSelected = this.wellnessCatalogueSelected.find ( p => p.id == id)
    if (productSelected) {
      Swal.fire('Ooops', 'Item del catálogo UNSPC ya fue seleccionado', 'info')
    } else {
      this.wellnessCatalogueSelected.push({id:id, code:code, name:name});
    }
  };

  getModality(){
      this.pdmSvc.getModality(this.modalityLimit, this.modalityOffset)
          .subscribe({
            error:(err:any) => {
              console.log(err);
            },
            next:(resp:any) => {
              console.log(resp)
              this.modalities = resp.results;
            }
          });
  };

  getWellnessCatalogue(){
    this.pdmSvc.getWellnessCatalogue(10, 0, this.searchCatalogWellness)
        .subscribe({
          error:(err:any) => {
            console.log(err);
          },
          next:(resp:any) => {
            console.log(resp)
            this.wellnessCatalogue = resp.results;
          }
        });
  };

  createContract(){
    const data = {
     contract: this.contractForm.value,
      contract_unspsc: this.wellnessCatalogueSelected.map( item =>  {
        return {
          wellness_classification: item.id
        }
      }) ,
      contract_product_contracted: this.catalogProductsSelected.map(item =>  {
        return {
          product_contracted: item.id
        }
      })
    };

    if (this.contractForm.valid && this.wellnessCatalogueSelected.length && this.catalogProductsSelected.length) {
          this.isLoading = !this.isLoading;
          this.pdmSvc.createContract(data)
              .subscribe({
                error:(err:any) => {
                  console.log(err);
                  this.alertSvc.handleErrors(err);
                },
                next:(resp:any) => {
                  console.log(resp)
                  this.alertSvc.currentAlert('Éxito', 'Contrato generado', 'success');
                  this.contractForm.reset();
                  this.wellnessCatalogueSelected = [];
                  this.catalogProductsSelected = [];
                  this.showAddContractModal = false;
                  this.isLoading = !this.isLoading;
                  this.getContracts();
                }
              });

    } else {
      this.alertSvc.currentAlert('', 'Todos los campos son requeridos', 'info');
    };
  };

  getContracts(){
    this.isLoading = !this.isLoading;
    this.pdmSvc.getContracts(this.contractsLimit, this.contractsOffset,this.yearSelected, this.goalId)
        .subscribe({
            error:(err:any) => {
              console.log(err);
              this.isLoading = !this.isLoading;
            },
            next:(resp:any) => {
              this.contracts = resp.results;
              console.log(resp)
              this.isLoading = !this.isLoading;
            }
        });
  };

  onPageChangeContractList(event:number){
    this.contractsOffset = event;
    this.getContracts();
  };

  getContractById(id:string){
    this.isLoading = !this.isLoading;
    this.pdmSvc.getContractById(id)
        .subscribe({
          error:(err:any) => {
            console.log(err);
            this.isLoading = !this.isLoading;
          },
          next:(resp:any) => {
            this.contractSelected = resp;
            this.contractSelected.products_contracted.forEach( (p:any) => {
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
            })
            this.isLoading = !this.isLoading;
          }
        });
  };

  addSourceFinancing(){
    const data = {
      contract_product_contracted: this.productSelected,
      source_financing: this.sourceSelected.id,
      value: this.contractSourceValue
    };

    this.isLoading = !this.isLoading;
    this.pdmSvc.addSourceFinancing(data)
        .subscribe({
          error:(err:any) => {
            this.alertSvc.handleErrors(err);
            this.isLoading = !this.isLoading;
          },
          next:(resp:any) => {
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

  deleteSourceFinancing(id:string){
    this.isLoading = !this.isLoading;
    this.pdmSvc.deleteSourceFinancing(id)
        .subscribe({
          error:(err:any) => {
            this.isLoading = !this.isLoading;
            this.alertSvc.handleErrors(err);
          },
          next:(resp:any) => {
            this.isLoading = !this.isLoading;
            this.alertSvc.currentAlert('Éxito', 'Fuente de financiación eliminado', 'success');
            this.getContractById(this.contractSelected.id);
          }
        })
  }

  showAddSource(product:string){
    this.showAddSourceModal = true;
    this.productSelected = product;
  };

  getSourceFinancing(){
    console.log(this.yearSelected)
    this.sourceFinancingSvc.getSourceFinancingByGoal(this.goalId, this.yearSelected)
          .subscribe({
            error:(err:any) => {
              this.alertSvc.handleErrors(err);
            },
            next:(resp:any) => {
              console.log(resp)
              this.sourcesFinancing = resp;
            }
          });
  };



  downloadProduct(productId:string){
    this.isLoading = !this.isLoading;
    const data = {
      contract_product_contracted_id:productId,
      year:this.yearSelected
    }
    this.pdmSvc.createContractDownloadable(data)
        .subscribe({
          error:(err:any) => {
            console.log(err);
            this.alertSvc.handleErrors(err);
            this.isLoading = !this.isLoading;
          },
          next:(resp:any) => {
            console.log(resp);
            setTimeout(() => {
              this.pdmSvc.getContractDownloadable(resp.id)
                .subscribe({
                  error:(err:any) => {
                    this.alertSvc.handleErrors(err);
                    this.isLoading = !this.isLoading;

                  },
                  next:(resp:any) => {
                    this.isLoading = !this.isLoading;
                    window.open(resp.file, '_blank')
                    console.log(resp)
                  }
                })
            }, 3000);
          }
        });
  };

  deleteContract(contractId:string){
    this.isLoading = !this.isLoading;
    this.pdmSvc.deleteContract(contractId)
        .subscribe({
          error:(err:any) => {
                this.isLoading = !this.isLoading;
                this.alertSvc.handleErrors(err);
              },
          next:(resp:any) => {
            this.isLoading = !this.isLoading;
            this.alertSvc.currentAlert('Éxito', 'Contrato eliminado', 'success');
            this.getContracts();
          }
        })
  };


  updateContract(){
    this.isLoading = !this.isLoading;
    const data = {
      "object": this.contractSelected.object,
      "modality": this.contractSelected.modality.id,
      "start_date": this.contractSelected.start_date,
      "end_date": this.contractSelected.end_date,
    };


    this.pdmSvc.updateContract(this.contractSelected.id, data)
          .subscribe({
            error:(err:any) => {
              this.isLoading = !this.isLoading;
              console.log(err);
              this.alertSvc.handleErrors(err);
            },
            next:(resp:any) => {
              console.log(resp)
              this.isLoading = !this.isLoading;
              this.alertSvc.currentAlert('Éxito', 'Contrato actualizado', 'success');
              this.getContractById(this.contractSelected.id);
            }
          });
  };

  updateResponsableUser(){
    const data = {
      name_responsible: this.contractSelected.name_responsible
    };
    this.isLoading = !this.isLoading;
    this.pdmSvc.updateResponsableUser(data, this.companyUser)
        .subscribe({
          error:(err:any) => {
            console.log(err);
            this.alertSvc.handleErrors(err);
            this.isLoading = !this.isLoading;
          },
          next:(resp:any) => {
            console.log(resp)
            this.alertSvc.currentAlert('Éxito', 'Responsable actualizado', 'success');
            this.isLoading = !this.isLoading;
            this.getContractById(this.contractSelected.id);
          }
        });
  };


  getUser(){
    this.authSvc.getUserInfo()
        .subscribe({
          error:(err:any) => {
            console.log(err);
          },
          next:(resp:any) => {
            console.log(resp)
            this.companyUser = resp.company.id;
          }
        });
  };

  getTotalForSelectedArray(array: any[]): number {
    return array.reduce((acc: number, item: any) => acc + (item.value || 0), 0);
  }

  getTotalFor(): number {
    return this.contractSelected.products_contracted.reduce((acc: number, item: any) => {
      const total = item?.contract_product_contracted_source_financing?.reduce(

        (sum: number, source: any) => sum + (source.value || 0),
        0
      );
      return acc + (total || 0);
    }, 0);
  }

}
