import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IncomesService } from '../../../../core/services/incomes/incomes.service';
import { AlertsService } from '../../../../core/services/alerts/alerts.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SourceFinancingService } from '../../../../core/services/sourceFinancing/source-financing.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit {
  @Input() data!:any;
  @Output() close = new EventEmitter<boolean>();
  public filterByHomologation:boolean = false;
  public searchSources:string = '';
  public isLoading:boolean = false;
  public allowSearch:boolean = true;
  public sourceSelected:{
    id:string,
    code:string,
    name:string
  } | undefined = undefined;
  public sources:{
    id:string,
    code:string,
    name:string
  }[] = [];
  public sourcesSelected:any[] =[];
  public incomeForm!: FormGroup;
  public situation:number = 1;
  ngOnInit(): void {
    this.incomeForm = new FormGroup({
      year: new FormControl(2024, [
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ]),
      initial_approval: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ]),
      additions: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ]),
      reductions: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ]),
      credit_transfer: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ]),
      debit_transfer: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ]),
      deferrals: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ]),
      displacement: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ]),
      total_approval: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ]),
      availability: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ]),
      previous_recognized: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ]),
      month_recognized: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ]),
      total_recognized: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ]),
      previous_collection: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ]),
      collection_month: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ]),
      total_collection: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ]),
      balance_collection: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ]),
      balance_executed: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ]),
      source_financing: new FormControl(null, [
        Validators.required,
      ]),
      situation: new FormControl(1, [
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ]),
    });
    this.loadForm();
  }

  constructor(private incomesSvc:IncomesService, private alertSvc:AlertsService, private sourceFinancingSvc:SourceFinancingService){}

  loadForm(){
    this.incomeForm.get('initial_approval')?.setValue(this.data.total_attributes.initial_approval);
    this.incomeForm.get('additions')?.setValue(this.data.total_attributes.additions);
    this.incomeForm.get('reductions')?.setValue(this.data.total_attributes.reductions);
    this.incomeForm.get('credit_transfer')?.setValue(this.data.total_attributes.credit_transfer);
    this.incomeForm.get('debit_transfer')?.setValue(this.data.total_attributes.debit_transfer);
    this.incomeForm.get('deferrals')?.setValue(this.data.total_attributes.deferrals);
    this.incomeForm.get('displacement')?.setValue(this.data.total_attributes.displacement);
    this.incomeForm.get('total_approval')?.setValue(this.data.total_attributes.total_approval);
    this.incomeForm.get('availability')?.setValue(this.data.total_attributes.availability);
    this.incomeForm.get('previous_recognized')?.setValue(this.data.total_attributes.previous_recognized);
    this.incomeForm.get('month_recognized')?.setValue(this.data.total_attributes.month_recognized);
    this.incomeForm.get('total_recognized')?.setValue(this.data.total_attributes.total_recognized);
    this.incomeForm.get('previous_collection')?.setValue(this.data.total_attributes.previous_collection);
    this.incomeForm.get('collection_month')?.setValue(this.data.total_attributes.collection_month);
    this.incomeForm.get('total_collection')?.setValue(this.data.total_attributes.total_collection);
    this.incomeForm.get('balance_collection')?.setValue(this.data.total_attributes.balance_collection);
    this.incomeForm.get('balance_executed')?.setValue(this.data.total_attributes.balance_executed);
    this.sourcesSelected = this.data.sources_financing;
    this.incomeForm.get('source_financing')?.setValue(this.sourceSelected?.id);
  };

  goAway(){
    this.close.emit(true)
  };


  getSourceFinancing(){
    this.isLoading = !this.isLoading;
    this.sourceFinancingSvc.getSourceFinancing(this.filterByHomologation, this.searchSources)
        .subscribe({
          error:(err:any) => {
            console.log(err);
            this.isLoading = !this.isLoading;
          },
          next:(resp:any) => {
            this.isLoading = !this.isLoading;
            console.log(resp)
            this.sources = resp.results;
          }
        });
  };

  selectSource(s:any){
    this.sourceSelected = s;
    this.incomeForm.get('source_financing')?.setValue(s.id)
    this.sources = [];
  };


  updateIncome(){
    this.isLoading = !this.isLoading;
    this.incomesSvc.updateIncomeDetail(this.data.id, this.incomeForm.value)
        .subscribe({
          error:(err:any) => {
            this.isLoading = !this.isLoading;
            this.alertSvc.handleErrors(err);
          },
          next:(resp:any) => {
            this.alertSvc.currentAlert('Éxito', 'Ingreso actualizado', 'success');
            this.goAway();
            this.isLoading = !this.isLoading;
          }
        });
  };

  deleteSourceFinancing(sourceId:any){
    if (sourceId !== null) {
      this.isLoading = !this.isLoading;
      this.incomesSvc.deleteSourceFinancing(this.data.id, sourceId )
            .subscribe({
              error:(err:any) => {
                this.alertSvc.handleErrors(err);
                this.isLoading = !this.isLoading;
              },
              next:(resp:any) => {
                this.sourceSelected = undefined;
                this.alertSvc.currentAlert('Éxito', 'Fuente de financiamiento eliminada', 'success');
                this.sourcesSelected = this.sourcesSelected.filter(source => source.source_financing.id !== sourceId);
                this.isLoading = !this.isLoading;
                this.allowSearch = true;
              }
            });
    } else {
      this.sourceSelected = undefined;
    }
  };

  editSource(source:any){
    console.log(source)
    if (source.source_financing.id ==  this.incomeForm.get('source_financing')?.value ) {
      this.allowSearch = true;
      this.sourceSelected = undefined;
      this.loadForm();
    }else {
      this.incomeForm.get('initial_approval')?.setValue(source.initial_approval);
      this.incomeForm.get('additions')?.setValue(source.additions);
      this.incomeForm.get('reductions')?.setValue(source.reductions);
      this.incomeForm.get('deferrals')?.setValue(source.deferrals);
      this.incomeForm.get('displacement')?.setValue(source.displacement);
      this.incomeForm.get('availability')?.setValue(source.availability);
      this.incomeForm.get('previous_recognized')?.setValue(source.previous_recognized);
      this.incomeForm.get('month_recognized')?.setValue(source.month_recognized);
      this.incomeForm.get('total_recognized')?.setValue(source.total_recognized);
      this.incomeForm.get('previous_collection')?.setValue(source.previous_collection);
      this.incomeForm.get('collection_month')?.setValue(source.collection_month);
      this.incomeForm.get('total_collection')?.setValue(source.total_collection);
      this.incomeForm.get('balance_collection')?.setValue(source.balance_collection);
      this.incomeForm.get('balance_executed')?.setValue(this.data.total_attributes.balance_executed);
      this.sourceSelected = source.source_financing;
      this.incomeForm.get('source_financing')?.setValue(this.sourceSelected?.id);
      this.allowSearch = false;
    }
    console.log(this.incomeForm.value)
  }

}
