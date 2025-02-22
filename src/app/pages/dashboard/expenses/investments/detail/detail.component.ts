import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertsService } from '../../../../../core/services/alerts/alerts.service';
import { OperatingExpensesService } from '../../../../../core/services/operatingExpenses/operating-expenses.service';
import { SourceFinancingService } from '../../../../../core/services/sourceFinancing/source-financing.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit{
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
    this.expenseForm.get('initial_approval')?.setValue(this.data.totals.initial_approval);
    this.expenseForm.get('additions')?.setValue(this.data.totals.additions);
    this.expenseForm.get('reductions')?.setValue(this.data.totals.reductions);
    this.expenseForm.get('deferrals')?.setValue(this.data.totals.deferrals);
    this.expenseForm.get('displacement')?.setValue(this.data.totals.displacement);
    this.expenseForm.get('transfer_with_credit')?.setValue(this.data.totals.transfer_with_credit);
    this.expenseForm.get('credit_transfer')?.setValue(this.data.totals.credit_transfer);
    this.expenseForm.get('total_approval')?.setValue(this.data.totals.total_approval);
    this.expenseForm.get('availability')?.setValue(this.data.totals.availability);
    this.expenseForm.get('previous_commitments')?.setValue(this.data.totals.previous_commitments);
    this.expenseForm.get('commitments_month')?.setValue(this.data.totals.commitments_month);
    this.expenseForm.get('cumulative_commitments')?.setValue(this.data.totals.cumulative_commitments);
    this.expenseForm.get('executed_balance')?.setValue(this.data.totals.executed_balance);
    this.expenseForm.get('previous_payments')?.setValue(this.data.totals.previous_payments);
    this.expenseForm.get('payments_month')?.setValue(this.data.totals.payments_month);
    this.expenseForm.get('accumulated_payments')?.setValue(this.data.totals.accumulated_payments);
    this.expenseForm.get('obligations')?.setValue(this.data.totals.obligations);
    this.expenseForm.get('balance')?.setValue(this.data.totals.balance);
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
    this.expensesSvc.addInvestmentsExpenseDetail( this.expenseForm.value, this.data.id)
        .subscribe({
          error:(err:any) => {
            this.isLoading = !this.isLoading;
            this.alertSvc.handleErrors(err);
          },
          next:(resp:any) => {
            console.log(resp)
            this.alertSvc.currentAlert('Éxito', 'Inversión actualizada', 'success');
            this.goAway();
            this.isLoading = !this.isLoading;
          }
        });
  };

  deleteOperatingExpense(sourceId:any){
    console.log()
    if (sourceId !== null) {
      this.isLoading = !this.isLoading;
      this.expensesSvc.deleteInvestmentsExpenseSource(this.data.id, sourceId )
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

  editSource(source:any){
    if (source.source_financing.id ==  this.expenseForm.get('source_financing')?.value ) {
      this.allowSearch = true;
      this.sourceSelected = undefined;
      this.loadForm();
    }else {
      this.expenseForm.get('initial_approval')?.setValue(source.initial_approval);
      this.expenseForm.get('additions')?.setValue(source.additions);
      this.expenseForm.get('reductions')?.setValue(source.reductions);
      this.expenseForm.get('deferrals')?.setValue(source.deferrals);
      this.expenseForm.get('displacement')?.setValue(source.displacement);
      this.expenseForm.get('transfer_with_credit')?.setValue(source.transfer_with_credit);
      this.expenseForm.get('credit_transfer')?.setValue(source.credit_transfer);
      this.expenseForm.get('total_approval')?.setValue(source.total_approval);
      this.expenseForm.get('availability')?.setValue(source.availability);
      this.expenseForm.get('previous_commitments')?.setValue(source.previous_commitments);
      this.expenseForm.get('commitments_month')?.setValue(source.commitments_month);
      this.expenseForm.get('cumulative_commitments')?.setValue(source.cumulative_commitments);
      this.expenseForm.get('executed_balance')?.setValue(source.executed_balance);
      this.expenseForm.get('previous_payments')?.setValue(source.previous_payments);
      this.expenseForm.get('payments_month')?.setValue(source.payments_month);
      this.expenseForm.get('accumulated_payments')?.setValue(source.accumulated_payments);
      this.expenseForm.get('obligations')?.setValue(source.obligations);
      this.expenseForm.get('balance')?.setValue(source.balance);
      this.sourceSelected = source.source_financing;
      this.expenseForm.get('source_financing')?.setValue(this.sourceSelected?.id);
      this.allowSearch = false;
    }
  }


}
