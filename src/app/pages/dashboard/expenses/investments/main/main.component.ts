import { Component, Input, OnInit } from '@angular/core';
import { OperatingExpensesService } from '../../../../../core/services/operatingExpenses/operating-expenses.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {

  public investments:any[] = [];
  public isLoading:boolean = false;
  public investmentSelected:any;
  public year:string = '';
  public sectorSelected:any;
  public codeSelected:any;
  public goalSelected:any;
  public rubricSelected:any;
  public showRubricDetail:any;
  public offset: number = 0;

  constructor(private expensesSvc:OperatingExpensesService, private activatedRoute:ActivatedRoute ){}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params:any) => {
      this.year = params.year;
      this.getInvestments();
    });
  };

  getInvestments(){
    this.isLoading = !this.isLoading;
    this.expensesSvc.getInvestmentsExpenses( this.year, 10, 0)
      .subscribe({
        error:(err:any) => {
          console.log(err);
          this.isLoading = !this.isLoading;
        },
        next:(resp:any) => {
          console.log(resp);
          this.investments = resp;
          this.isLoading = !this.isLoading;
          }
        });
  };

  chooseInvestments(inv:any){
    this.investmentSelected = inv;
    this.sectorSelected = undefined;
    this.codeSelected = undefined;
    this.goalSelected = undefined;
    this.rubricSelected = undefined;
  };

  chooseSector(sector:any) {
    this.sectorSelected = sector;
    this.codeSelected = undefined
    this.goalSelected = undefined;
    this.rubricSelected = undefined;
  };

  chooseCode(code:any){
    this.codeSelected = code;
    this.goalSelected = undefined;
    this.rubricSelected = undefined;
  };

  chooseGoal(goal:any) {
    this.goalSelected = goal;
    this.rubricSelected = undefined;
  };

  chooseRubric(rubric:any){
    this.rubricSelected = rubric;
    this.showRubricDetail = !this.showRubricDetail;
  };

  refresh(){
    this.getInvestments();
    this.investmentSelected = undefined;
    this.sectorSelected = undefined;
    this.codeSelected = undefined;
    this.goalSelected = undefined;
    this.rubricSelected = undefined;
    this.showRubricDetail = false;
  };


  handlePageChange(newOffset: number): void {
    this.offset = newOffset;
    this.refresh();
  }
}
