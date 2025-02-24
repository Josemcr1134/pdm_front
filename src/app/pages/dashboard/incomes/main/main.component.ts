import { Component, OnInit } from '@angular/core';
import { IncomesService } from '../../../../core/services/incomes/incomes.service';
import { AlertsService } from '../../../../core/services/alerts/alerts.service';
import { PlanningService } from '../../../../core/services/planning/planning.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit{
  public yearSelected:number = 0;
  public years:any;
  public incomes:any[]=[];
  public isLoading:boolean = false;
  public showIncomeDetail:boolean = false;
  public incomeDetail:any;
  constructor(private incomesSvc:IncomesService, private pdmSvc:PlanningService){}

  ngOnInit(): void {
    this.getIncomes();
    this.getYears();
  }

  getIncomes(){
    this.isLoading = !this.isLoading;
    this.incomesSvc.getIncomes(this.yearSelected)
        .subscribe({
          error:(err:any) => {
            console.log(err);
            this.isLoading = !this.isLoading;
          },
          next:(resp:any) => {
            this.incomes = resp.incomes;
            console.log(this.incomes)
            this.isLoading = !this.isLoading;
          }
        });
  };

  toggleItem(item: any): void {
    item.expanded = !item.expanded;

    // Sincronizar expansión para fuentes de financiamiento, si las tiene
    if (item.sources_financing) {
      item.sources_financing.forEach((source: any) => {
        source.expanded = item.expanded;
      });
    }
  }


  selectItem(data:{}){
    this.incomeDetail = data;
    this.showIncomeDetail = !this.showIncomeDetail;
  };

  refresh(){
    this.showIncomeDetail = false;
    this.getIncomes();
  };

  getYears(){
    this.pdmSvc.getYears()
        .subscribe({
          error:(err:any) => {
            console.log(err);
          },
          next:(resp:any) => {
            this.years = resp;
            this.yearSelected = resp.first_year;
          }
        });
  };
}
