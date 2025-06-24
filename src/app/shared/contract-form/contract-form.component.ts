import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoaderComponent } from '../loader/loader.component';
import { PlanningService } from '../../core/services/planning/planning.service';
import { AlertsService } from '../../core/services/alerts/alerts.service';
import { PaginationComponent } from '../pagination/pagination.component';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
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
  @Input() operatingExpense:any = null
  contractForm!: FormGroup;
  public isLoading:boolean = false;
  public catalogProducts:any[] = [];
  public modalities:any[] = [];
  public catalogProductsSelected:any[] = [];
  public wellnessCatalogueSelected:any[] = [];
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
      goal: [''],
      executing_unit: [null, Validators.required],
      operating_expense:[null]
    });
  }
  private searchSubject = new Subject<string>();
  private searchWellnessSubject = new Subject<string>();
  isSearching: boolean = false;
  isWellnessSearching: boolean = false;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params:any) => {
      this.productMgaCode = params.codeProductMga;
    });
    this.contractForm.get('goal')?.setValue(this.goalId);
    this.contractForm.get('operating_expense')?.setValue(this.operatingExpense);
    this.getYears();
    this.getContractExecutionUnit();
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchText => {
      this.pdmSvc.getCatalogProduct(
        this.productMgaCode,
        this.catalogProductLimit,
        this.catalogProductOffset,
        searchText
      ).subscribe({
        error: (err: any) => {
          console.log(err);
          this.isSearching = false; // Desactiva el loader en caso de error
        },
        next: (resp: any) => {
          console.log(resp);
          this.catalogProducts = resp.results;
          this.isSearching = false; // Desactiva el loader cuando llega la respuesta
        }
      });
    });
    this.searchWellnessSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchText => {
     this.pdmSvc.getWellnessCatalogue(10, 0, searchText)
        .subscribe({
          error:(err:any) => {
            console.log(err);
            this.isWellnessSearching = false; // Desactiva el loader en caso de error
          },
          next:(resp:any) => {
            this.isWellnessSearching = false; // Desactiva el loader en caso de error
            this.wellnessCatalogue = resp.results;
          }
        });
    });
    this.getModality();
  }

  createContract(){
    const data = {
     contract: {...this.contractForm.value, product_classifications: this.wellnessCatalogueSelected.map( item =>item.id )
      },

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

  getWellnessCatalogue(searchText:string){
    this.isWellnessSearching = true; // Activa el loader
    this.searchWellnessSubject.next(searchText);
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


  getProductsContracts(searchText: string) {
    this.isSearching = true; // Activa el loader
    this.searchSubject.next(searchText);
  }

  deleteProductContrated(index:number){
    if (index > -1) { // Si el elemento existe
      this.catalogProductsSelected.splice(index, 1); // Elimina 1 elemento en esa posición
    }
  };

  deleteWellness(index:number){
    if (index > -1) { // Si el elemento existe
      this.wellnessCatalogueSelected.splice(index, 1); // Elimina 1 elemento en esa posición
    }
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


}
