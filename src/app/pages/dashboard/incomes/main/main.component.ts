import { Component, OnInit } from '@angular/core';
import { IncomesService } from '../../../../core/services/incomes/incomes.service';
import { AlertsService } from '../../../../core/services/alerts/alerts.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit{
  public year:number = 2024
  public incomes:any[]=[];
  public isLoading:boolean = false;
  public showIncomeDetail:boolean = false;
  public incomeDetail:any;
  constructor(private incomesSvc:IncomesService, private alertSvc:AlertsService){}

  ngOnInit(): void {
    this.getIncomes();
  }

  getIncomes(){
    this.isLoading = !this.isLoading;
    this.incomesSvc.getIncomes(2024)
        .subscribe({
          error:(err:any) => {
            console.log(err);
            this.isLoading = !this.isLoading;
          },
          next:(resp:any) => {
            console.log(resp)
            this.incomes = resp.incomes;
            this.isLoading = !this.isLoading;
          }
        });
  };

  toggleItem(item: any): void {
    item.expanded = !item.expanded;
  };

  selectItem(data:{}){
    this.incomeDetail = data;
    this.showIncomeDetail = !this.showIncomeDetail;
    console.log(data);
  };

  refresh(){
    this.showIncomeDetail = false;
    this.getIncomes();
  };

}
