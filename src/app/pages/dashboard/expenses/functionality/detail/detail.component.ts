import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertsService } from '../../../../../core/services/alerts/alerts.service';
import { IncomesService } from '../../../../../core/services/incomes/incomes.service';
import { SourceFinancingService } from '../../../../../core/services/sourceFinancing/source-financing.service';
import { OperatingExpensesService } from '../../../../../core/services/operatingExpenses/operating-expenses.service';

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
  public expenseForm!: FormGroup;
  public sourcesSelected:any[] = [];
  ngOnInit(): void {
    this.expenseForm = new FormGroup({
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
      transfer_with_credit: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ]),
      credit_transfer: new FormControl(null, [
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
      previous_commitments: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ]),
      commitments_month: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ]),
      cumulative_commitments: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ]),
      executed_balance: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ]),
      previous_payments: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ]),
      payments_month: new FormControl(null, [
        Validators.required,
      ]),
      accumulated_payments: new FormControl(1, [
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ]),
      obligations: new FormControl(1, [
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ]),
      balance: new FormControl(1, [
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ]),
      source_financing: new FormControl(1, [
        Validators.required,
      ]),
    });
    this.loadForm();
  }

  constructor(private expensesSvc:OperatingExpensesService, private alertSvc:AlertsService, private sourceFinancingSvc:SourceFinancingService){}

  loadForm(){
    this.expenseForm.get('initial_approval')?.setValue(this.data.total_attributes.initial_approval);
    this.expenseForm.get('additions')?.setValue(this.data.total_attributes.additions);
    this.expenseForm.get('reductions')?.setValue(this.data.total_attributes.reductions);
    this.expenseForm.get('deferrals')?.setValue(this.data.total_attributes.deferrals);
    this.expenseForm.get('displacement')?.setValue(this.data.total_attributes.displacement);
    this.expenseForm.get('transfer_with_credit')?.setValue(this.data.total_attributes.transfer_with_credit);
    this.expenseForm.get('credit_transfer')?.setValue(this.data.total_attributes.credit_transfer);
    this.expenseForm.get('total_approval')?.setValue(this.data.total_attributes.total_approval);
    this.expenseForm.get('availability')?.setValue(this.data.total_attributes.availability);
    this.expenseForm.get('previous_commitments')?.setValue(this.data.total_attributes.previous_commitments);
    this.expenseForm.get('commitments_month')?.setValue(this.data.total_attributes.commitments_month);
    this.expenseForm.get('cumulative_commitments')?.setValue(this.data.total_attributes.cumulative_commitments);
    this.expenseForm.get('executed_balance')?.setValue(this.data.total_attributes.executed_balance);
    this.expenseForm.get('previous_payments')?.setValue(this.data.total_attributes.previous_payments);
    this.expenseForm.get('payments_month')?.setValue(this.data.total_attributes.payments_month);
    this.expenseForm.get('accumulated_payments')?.setValue(this.data.total_attributes.accumulated_payments);
    this.expenseForm.get('obligations')?.setValue(this.data.total_attributes.obligations);
    this.expenseForm.get('balance')?.setValue(this.data.total_attributes.balance);
    this.sourcesSelected = this.data.sources_financing;
    this.expenseForm.get('source_financing')?.setValue(this.sourceSelected?.id);
    console.log(this.expenseForm.get('source_financing')?.value)
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
    this.expenseForm.get('source_financing')?.setValue(s.id)
    this.sources = [];
  };


  updateExpense(){
    this.isLoading = !this.isLoading;
    this.expensesSvc.addOperatingExpenseDetail( this.expenseForm.value, this.data.id)
        .subscribe({
          error:(err:any) => {
            this.isLoading = !this.isLoading;
            this.alertSvc.handleErrors(err);
          },
          next:(resp:any) => {
            console.log(resp)
            this.alertSvc.currentAlert('Éxito', 'Ingreso actualizado', 'success');
            this.goAway();
            this.isLoading = !this.isLoading;
          }
        });
  };

  deleteOperatingExpense(sourceId:any){
    console.log()
    if (sourceId !== null) {
      this.isLoading = !this.isLoading;
      this.expensesSvc.deleteOperatingExpenseSource(this.data.id, sourceId )
            .subscribe({
              error:(err:any) => {
                this.alertSvc.handleErrors(err);
                this.isLoading = !this.isLoading;
              },
              next:(resp:any) => {
                this.sourceSelected = undefined;
                this.sourcesSelected = this.sourcesSelected.filter(source => source.source_financing.id !== sourceId);
                this.alertSvc.currentAlert('Éxito', 'Fuente de financiamiento eliminada', 'success');
                this.isLoading = !this.isLoading;
              }
            });
    } else {
      this.sourceSelected = undefined;
    }
  };


}
