import { Component, OnInit } from '@angular/core';
import { OperatingExpensesService } from '../../../../../core/services/operatingExpenses/operating-expenses.service';
import { AlertsService } from '../../../../../core/services/alerts/alerts.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {
  public isLoading:boolean = false;
  public expenses:any[] = [];
  public year:string = '';
  public executionCode:string = '';
  public expenseSelected:any;
  public showExpenseDetail:boolean = false;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params:any) => {
      this.year = params.year;
      this.executionCode = params.executionCode;
      this.getExpenses();
    })
  }

  constructor(private expensesSvc:OperatingExpensesService, private activatedRoute:ActivatedRoute){}

  getExpenses(){
    this.isLoading = !this.isLoading;
    this.expensesSvc.getOperatingExpenses(this.executionCode, this.year)
        .subscribe({
          error:(err:any) => {
            this.isLoading = !this.isLoading;
          },
          next:(resp:any) => {
            this.expenses = resp.operating_expenses;
            console.log(this.expenses)
            this.isLoading = !this.isLoading;
          }
        })
  };

  toggleItem(item: any): void {
    item.expanded = !item.expanded;
    // Si el item tiene sources_financing, también aplica la expansión
    if (item.sources_financing) {
      item.sources_financing.forEach((source: any) => {
        source.expanded = item.expanded; // Sincroniza la expansión de las fuentes de financiamiento
      });
    }
  }


  selectItem(child:any){
    this.expenseSelected = child;
    this.showExpenseDetail = true;
  };

  refresh(){
    this.showExpenseDetail = false;
    this.getExpenses();
  };

}
