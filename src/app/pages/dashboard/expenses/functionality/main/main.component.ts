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
  public year:string = '2024';
  public expenseSelected:any;
  public showExpenseDetail:boolean = false;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params:any) => {
      this.year = params.year;
      this.getExpenses();
    })
  }

  constructor(private expensesSvc:OperatingExpensesService, private activatedRoute:ActivatedRoute){}

  getExpenses(){
    this.isLoading = !this.isLoading;
    this.expensesSvc.getOperatingExpenses('16', this.year)
        .subscribe({
          error:(err:any) => {
            console.log(err);
            this.isLoading = !this.isLoading;
          },
          next:(resp:any) => {
            this.expenses = resp.operating_expenses;
            this.isLoading = !this.isLoading;
          }
        })
  };

  toggleItem(item: any): void {
    item.expanded = !item.expanded;
  };

  selectItem(child:any){
    console.log(child);
    this.expenseSelected = child;
    this.showExpenseDetail = true;
  };

  refresh(){
    this.showExpenseDetail = false;
    this.getExpenses();
  };

}
