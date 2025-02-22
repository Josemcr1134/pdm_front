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
      deferrals: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ]),
      displacement: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ]),
      availability: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ]),
      commitments_month: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ]),
      commitments_total: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ]),
      balance_executed: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ]),
      previous_payments: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ]),
      payments_month: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ]),
      total_payments: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ]),
      obligations_payable: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ]),
      balance: new FormControl(null, [
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
    this.incomeForm.get('deferrals')?.setValue(this.data.total_attributes.deferrals);
    this.incomeForm.get('displacement')?.setValue(this.data.total_attributes.displacement);
    this.incomeForm.get('availability')?.setValue(this.data.total_attributes.availability);
    this.incomeForm.get('commitments_month')?.setValue(this.data.total_attributes.commitments_month);
    this.incomeForm.get('commitments_total')?.setValue(this.data.total_attributes.commitments_total);
    this.incomeForm.get('balance_executed')?.setValue(this.data.total_attributes.balance_executed);
    this.incomeForm.get('previous_payments')?.setValue(this.data.total_attributes.previous_payments);
    this.incomeForm.get('payments_month')?.setValue(this.data.total_attributes.payments_month);
    this.incomeForm.get('total_payments')?.setValue(this.data.total_attributes.total_payments);
    this.incomeForm.get('obligations_payable')?.setValue(this.data.total_attributes.obligations_payable);
    this.incomeForm.get('balance')?.setValue(this.data.total_attributes.balance);
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
      this.incomeForm.get('commitments_month')?.setValue(source.commitments_month);
      this.incomeForm.get('commitments_total')?.setValue(source.commitments_total);
      this.incomeForm.get('balance_executed')?.setValue(source.balance_executed);
      this.incomeForm.get('previous_payments')?.setValue(source.previous_payments);
      this.incomeForm.get('payments_month')?.setValue(source.payments_month);
      this.incomeForm.get('total_payments')?.setValue(source.total_payments);
      this.incomeForm.get('obligations_payable')?.setValue(source.obligations_payable);
      this.incomeForm.get('balance')?.setValue(this.data.total_attributes.balance);
      this.sourceSelected = source.source_financing;
      this.incomeForm.get('source_financing')?.setValue(this.sourceSelected?.id);
      this.allowSearch = false;
    }
    console.log(this.incomeForm.value)
  }

}
