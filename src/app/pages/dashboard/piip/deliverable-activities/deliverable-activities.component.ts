import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from '../../../../shared/alert/alert.component';
import { LoaderComponent } from '../../../../shared/loader/loader.component';
import { PiipService } from '../../../../core/services/piip/piip.service';
import { PlanningService } from '../../../../core/services/planning/planning.service';
import { AlertsService } from '../../../../core/services/alerts/alerts.service';
import { CurrencyInputDirective } from '../../../../core/directives/currency-input.directive';
interface Expense {
  initial_approval: number;
  credit_transfer: number;
  transfer_with_credit: number;
  displacement: number;
  reductions: number;
  total_approval: number;
  availability: number;
  cumulative_commitments: number;
  commitments_month: number;
  obligations: number;
  accumulated_payments: number;
  payments_month: number;
  balance: number;
  executed_balance: number;
  additions: number;
  id?:string
}

interface DeliverableActivity {
  id: number;
  type: string;
  name: string;
  expense: Expense;
}
@Component({
  selector: 'app-deliverable-activities',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LoaderComponent,

  ],
  templateUrl: './deliverable-activities.component.html',
  styleUrl: './deliverable-activities.component.css',
  providers:[
    CurrencyPipe
  ]
})
export class DeliverableActivitiesComponent implements OnInit {
  public codeSelected:any = null;
  public yearSelected:number = 2025;
  public years:any = null;
  public isLoading:boolean = false;
  public deliverableActivities:any[] = [];
  public totals:any;
    a = {
    expense: {
      initial_approval: 0  // Valor inicial
    }
  };
  constructor(private piipSvc:PiipService, private pdmSvc:PlanningService, private alertSvc:AlertsService, private currencyPipe: CurrencyPipe) { }

  ngOnInit(): void {
    this.codeSelected = JSON.parse(localStorage.getItem('codeSelected') || '');
    this.getYears();
    this.getDeliverableActivities()
  }

  getDeliverableActivities(){
    this.isLoading = !this.isLoading;
    this.piipSvc.getDeliverableActivity(this.yearSelected, this.codeSelected.id)
      .subscribe({
        error:(err:any) => {
          console.log(err);
          this.isLoading = !this.isLoading;
        },
        next:(resp:any) => {
          console.log(resp)
          this.deliverableActivities = resp.activities ;
          this.totals = resp.totals_code_product;
          this.isLoading = !this.isLoading;
        }
      });
  };

  getYears(){
    this.isLoading = !this.isLoading;
    this.pdmSvc.getYears()
        .subscribe({
          error:(err:any) => {
            console.log(err);
            this.isLoading = !this.isLoading;
          },
          next:(resp:any) => {
            this.years = resp;
            this.yearSelected = resp.first_year;
            this.isLoading = !this.isLoading;

          }
        });
  };

  updateDeliverableActivity(data:Expense, activity:string){
    this.isLoading = !this.isLoading;
    delete data.id;
    this.piipSvc.updateDeliverableActivity(data, activity)
        .subscribe({
          error:(err:any) => {
            console.log(err);
            this.alertSvc.handleErrors(err);
            this.isLoading = !this.isLoading;
          },
          next:(resp:any) => {
            this.alertSvc.currentAlert('Éxito', 'Actividad actualizada', 'success')
            this.isLoading = !this.isLoading;
            setTimeout(() => {
              location.reload()

            }, 2000);
          }
        })
  }

  formatCurrency(event: any, activity: any, field: keyof Expense) {
    let value = event.target.value;
    value = value.replace(/[^\d.]/g, '');
    const numberValue = parseFloat(value) || 0;

    event.target.value = this.currencyPipe.transform(numberValue, 'COP', 'symbol', '1.2-2');
    activity.expense[field] = numberValue  ;
  }

  // Función para remover formato al enfocar
  removeFormatting(event: any, activity: DeliverableActivity, field: keyof Expense) {
    event.target.value = activity.expense[field] || '';
  }


}
