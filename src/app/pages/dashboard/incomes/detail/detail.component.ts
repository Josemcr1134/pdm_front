import { Component, Input, OnInit } from '@angular/core';
import { IncomesService } from '../../../../core/services/incomes/incomes.service';
import { AlertsService } from '../../../../core/services/alerts/alerts.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit {
  @Input() data!:any;
  public isLoading:boolean = false;

  incomeForm!: FormGroup;

  ngOnInit(): void {
    this.incomeForm = new FormGroup({
      year: new FormControl(null, [
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
    });
  }

  constructor(private incomesSvc:IncomesService, private alertSvc:AlertsService){}

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
  }


}
