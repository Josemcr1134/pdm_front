import { Component, Input, OnInit } from '@angular/core';
import { OperatingExpensesService } from '../../../../../core/services/operatingExpenses/operating-expenses.service';
import { ActivatedRoute } from '@angular/router';
import { PlanningService } from '../../../../../core/services/planning/planning.service';
import { AlertsService } from '../../../../../core/services/alerts/alerts.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {

  public investments:any[] = [];
  public isLoading:boolean = false;
  public showRubricModal:boolean = false;
  public investmentSelected:any;
  public year:string = '';
  public sectorSelected:any;
  public codeSelected:any;
  public goalSelected:any;
  public rubricSelected:any;
  public showRubricDetail:any;
  public offset: number = 0;
  public itemSelected:number = 0;
  public collapsedStates = new Map<string, boolean>(); // Para rastrear el estado de cada sección
  public columnSelected:number = 0;
  public indexSelected!:number;
  public totalInvestments:any;
  constructor(private alertSvc:AlertsService, private expensesSvc:OperatingExpensesService, private activatedRoute:ActivatedRoute, private pdmSvc:PlanningService ){}

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
          this.totalInvestments = resp.total_investment;
          this.investments = resp.detail;
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
    console.log(code)
    this.goalSelected = undefined;
    this.rubricSelected = undefined;
  };

  chooseGoal(goal:any) {
    this.goalSelected = goal;
    this.goalSelected.rubrics.forEach((rubric:any) => {
      rubric.expanded = false; // Inicialmente, todas las secciones estarán colapsadas
    });
    this.rubricSelected = undefined;
  };

  chooseRubric(rubric:any){
    this.rubricSelected = rubric;
    console.log(this.rubricSelected)
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
    this.showRubricModal = false;
  };


  handlePageChange(newOffset: number): void {
    this.offset = newOffset;
    this.refresh();
  };


  toggleCollapse(s: any, index: number, task:number, columnIndex:number) {
    this.indexSelected = columnIndex;
    this.columnSelected =  task;
    const key = `${s.code}-${index}-${task}-${columnIndex}`; // Identificador único para cada rúbrica e indicador
    this.collapsedStates.set(key, !this.collapsedStates.get(key));
  };

  isCollapsed(s: any, index: number , task:number, columnIndex:number): boolean {
    return this.collapsedStates.get(`${s.code}-${index}-${task}-${columnIndex}`) ?? true; // Por defecto colapsado
  };

  toggleCollapse2(index:number, columnIndex:number) {
    const key = `${index}-${columnIndex}`; // Identificador único para cada rúbrica e indicador
    this.collapsedStates.set(key, !this.collapsedStates.get(key));
  };

  isCollapsed2( index: number ,columnIndex:number): boolean {
    return this.collapsedStates.get(`${index}-${columnIndex}`) ?? true; // Por defecto colapsado
  };


  deleteRubric(rubricId:string){
    this.isLoading = !this.isLoading;
    this.expensesSvc.deleteRubric(this.goalSelected.id, rubricId)
        .subscribe({
          error:(err:any) => {
            this.alertSvc.handleErrors(err);
            this.isLoading = !this.isLoading;
          },
          next:(resp:any) =>{
            this.alertSvc.currentAlert('Éxito', 'Rubro eliminado', 'success');
            this.isLoading = !this.isLoading;
            this.refresh();
            }
          })
  }
}
