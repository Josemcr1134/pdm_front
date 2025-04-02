import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlanningService } from '../../../../core/services/planning/planning.service';
import { OperatingExpensesService } from '../../../../core/services/operatingExpenses/operating-expenses.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {
  public years:any;
  public yearSelected:number = 0;
  public investmentSelected:any;
  public currentUrl:string = '';
  public executionSelected:any;
  public isLoading:boolean = false;
  public tabSelected:number = 1;
  public executionUnits:{
    id:string,
    code:string,
    name:string
  }[] = []
  constructor(private router:Router, private pdmSvc:PlanningService, private expenseSvc:OperatingExpensesService){}


  ngOnInit(): void {
    this.getYears();
    this.getExecutionUnit();
  }

  handleYearChange(){
    this.isLoading = !this.isLoading;
    if (this.tabSelected == 1) {
      let currentUrl = this.router.url.slice(0, -4);
      this.currentUrl = currentUrl;
      this.router.navigateByUrl(currentUrl+this.yearSelected)
      this.isLoading = !this.isLoading;

    } else {
      let currentUrl = this.router.url.slice(0, -7);
      console.log('entre', currentUrl)
      this.currentUrl = currentUrl;
      this.router.navigateByUrl(this.currentUrl +this.yearSelected + `/${this.executionSelected}`)
      this.isLoading = !this.isLoading;
    }
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
            this.handleYearChange();

          }
        });
  };

  getExecutionUnit(){
    this.expenseSvc.getExecutionUnit(100, 0)
        .subscribe({
          error:(err:any) => {
            console.log(err);
          },
          next:(resp:any) => {
            this.executionUnits = resp.results;
            this.executionSelected = this.executionUnits[0];
          }
        });
  };

  chooseTab(tab:number){
    this.tabSelected = tab;
    if (tab == 1) {
      this.router.navigateByUrl('/dashboard/expenses/investments/' + this.yearSelected )
    } else {
      this.setExecutionId()
      this.router.navigateByUrl('/dashboard/expenses/functionality/' + this.yearSelected + '/' + this.executionSelected?.code)
    }
  }

  setExecutionId(){
    console.log(this.executionSelected.id)
    localStorage.removeItem('executionId')
    localStorage.setItem('executionId', this.executionSelected?.id)
  }
}
