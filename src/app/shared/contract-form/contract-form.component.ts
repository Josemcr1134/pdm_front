import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoaderComponent } from '../loader/loader.component';
import { PlanningService } from '../../core/services/planning/planning.service';
import { AlertsService } from '../../core/services/alerts/alerts.service';
import { PaginationComponent } from '../pagination/pagination.component';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contract-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    LoaderComponent,
    PaginationComponent
  ],
  templateUrl: './contract-form.component.html',
  styleUrl: './contract-form.component.css'
})
export class ContractFormComponent implements OnInit{
  @Input() goalId:any = null;

  contractForm!: FormGroup;
  public isLoading:boolean = false;
  public catalogProducts:any[] = [];
  public modalities:any[] = [];
  public catalogProductsSelected:any[] = [];
  public wellnessCatalogueSelected:any[] = [];
  public productClasificationSelected:any[] = [];
  public wellnessCatalogue:any[] = [];
  public searchCatalogProducts:string = '';
  public searchCatalogWellness:string = '';
  public modalityLimit:number = 40;
  public modalityOffset:number = 0;
  public catalogProductLimit:number = 100;
  public catalogProductOffset:number = 0;
  public yearSelected:number = 2024;
  public years:any;
  public contractExecutions:{
    code:string,
    id:string,
    name:string
  }[] = [];
  public productClasification:{
    code:string,
    id:string,
    name:string,
    classification:any
  }[] = [];

  public contractExecutionLimit:number = 10;
  public contractExecutionOffset:number = 0;
  public productMgaCode:string = '';
  public searchProductClasification:string = '';
  @Output() close = new EventEmitter();
  constructor(private fb:FormBuilder, private pdmSvc:PlanningService, private alertSvc:AlertsService, private activatedRoute:ActivatedRoute){
    this.contractForm = this.fb.group({
      object: ['', Validators.required],
      modality: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      year: [new Date().getFullYear(), [Validators.required, Validators.min(1900), Validators.max(32767)]],
      goal: ['', Validators.required],
      executing_unit: [null, Validators.required],
      estimated_date_presentation: [null,  [Validators.required]],
      type_duration: ['', Validators.required],
      duration_contract: [null, [Validators.required, Validators.pattern(/^\d+$/)]],
      type_source_resource: [null, [Validators.required, Validators.pattern(/^\d+$/)]],
      contracting_unit: ['', Validators.required],
      future_vigencies_required: ['', Validators.required],
      status_request_future_vigencias: ['', Validators.required],
      answer_is_this_process_likely_to_be_limited_to_msm_es: ['', Validators.required],
      can_this_process_be_structured_in_batches_or_segments: ['', Validators.required],
      must_invest_30_percent_in_local_food_purchases: ['', Validators.required],
      does_the_contract_include_the_supply_of_goods_and_services_other_than_food: ['', Validators.required],
      responsible_phone: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      responsible_email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params:any) => {
      this.productMgaCode = params.codeProductMga;
    });
    this.contractForm.get('goal')?.setValue(this.goalId);
    this.getYears();
    this.getContractExecutionUnit();
    this.getProductsContracts();
    this.getModality();
    this.getWellnessCatalogue();
    this.getProductClassification();
  }

  createContract(){
    const data = {
     contract: this.contractForm.value,
      contract_unspsc: this.wellnessCatalogueSelected.map( item =>  {
        return {
          wellness_classification: item.id
        }
      }) ,
      product_classifications: this.productClasificationSelected[0].id ,
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
                  this.isLoading = !this.isLoading;

                },
                next:(resp:any) => {
                  console.log(resp)
                  this.alertSvc.currentAlert('Éxito', 'Contrato generado', 'success');
                  this.contractForm.reset();
                  this.wellnessCatalogueSelected = [];
                  this.catalogProductsSelected = [];
                  this.goAway()
                  this.isLoading = !this.isLoading;
                }
              });

    } else {
      this.alertSvc.currentAlert('', 'Todos los campos son requeridos', 'info');
    };
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
          }
        });
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
  chooseProductClasification(id:string, code:string, name:string){
    const productSelected = this.productClasificationSelected.find ( p => p.id == id)
    if (productSelected) {
      Swal.fire('Ooops', 'Item de la clasificación de productos ya fue seleccionado', 'info')
    } else if (this.productClasificationSelected.length > 0) {
      this.productClasificationSelected[0] = {id:id, code:code, name:name};

    } else{
      this.productClasificationSelected.push({id:id, code:code, name:name});
    }
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

 onPaginateContractExecution(event:number){
    this.contractExecutionOffset = event;
    this.getContractExecutionUnit();
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

  goAway(){
    this.close.emit(true)
  };

  getProductClassification(){
    this.pdmSvc.getProductClasification('')
        .subscribe({
          error:(err:any) => {
            console.log(err);
          },
          next:(resp:any) => {
            console.log(resp)
            this.productClasification = resp.results
          }
        })
  }
}
