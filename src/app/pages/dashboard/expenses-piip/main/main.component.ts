import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PiipService } from '../../../../core/services/piip/piip.service';
import { AlertsService } from '../../../../core/services/alerts/alerts.service';
import { PaginationComponent } from '../../../../shared/pagination/pagination.component';
import { LoaderComponent } from '../../../../shared/loader/loader.component';
import { DetailComponent } from '../../expenses/investments/detail/detail.component';
import { AddRubricComponent } from '../../expenses/investments/add-rubric/add-rubric.component';
import { OperatingExpensesService } from '../../../../core/services/operatingExpenses/operating-expenses.service';
import { LoadMatrixService } from '../../../../core/services/load-matrix/load-matrix.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    PaginationComponent,
    LoaderComponent,
    DetailComponent,
    AddRubricComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent  implements OnInit {
  public limit:number = 5;
  public offset:number = 0;
  public yearSelected:number = 2025;
  public month:any = null;
  public showRubricModal:boolean = false;
  public showRubricDetail:boolean = false;
  public isLoading:boolean = false;
    public itemSelected:number = 0;
  public collapsedStates = new Map<string, boolean>(); // Para rastrear el estado de cada sección
  public columnSelected:number = 0;
  public monthSelected:any = null;
  public indexSelected!:number;
  public totalExpenses:any;
  public expenseSelected:any;
  public sectorSelected:any;
  public codeSelected:any;
  public bpinSelected:any;
  public specificObjective:any;
  public expenses:any[] = [];
  public rubricSelected:any;
  selectedFile: File | any = null;
  totalInvestmentColapsed:boolean = true;
  itemColapsed:number = 0;

  ngOnInit(): void {
    this.getPiipExpenses();
  };

  constructor(private loadMatrixSvc:LoadMatrixService, private piipSvc:PiipService, private alertSvc:AlertsService, private expensesSvc:OperatingExpensesService){}


  getPiipExpenses(){
    this.isLoading = !this.isLoading;
    this.piipSvc.getPiipExpenses(this.yearSelected, this.month, this.limit, this.offset)
    .subscribe({
      error:(err:any) => {
        console.log(err);
        this.isLoading = !this.isLoading;
      },
      next:(resp:any) => {
        console.log(resp);
        this.expenses = resp.detail;
        this.totalExpenses = resp.total_expense;
        this.isLoading = !this.isLoading;
      }
    });
  };

  chooseExpense(expense:any){
    this.expenseSelected = expense;
    this.bpinSelected = undefined;
    this.specificObjective = undefined
    this.codeSelected = undefined;
  };

  chooseBpin(s:any){
    this.bpinSelected = s;
    this.specificObjective = undefined
    this.codeSelected = undefined;
  };

  chooseSpecificObjective(s:any){
    this.specificObjective = s;
    this.codeSelected = undefined;
  };

  chooseCodeProduct(s:any){
    this.codeSelected = s;
  };

  chooseRubric(rubric:any){
    this.rubricSelected = rubric;
    this.showRubricDetail = !this.showRubricDetail;
  };

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const allowedExtensions = ['xls', 'xlsx', 'xlsm', 'csv'];
      const fileExtension = file.name.split('.').pop()?.toLowerCase();

      if (fileExtension && allowedExtensions.includes(fileExtension)) {
        this.selectedFile = file;
      } else {
        this.alertSvc.currentAlert('Formato inválido', 'Por favor adjunta un archivo de Excel', 'info');
        this.selectedFile = null;
      }
    };
  };



  toogleCollapsed(item:number){
    if(item == this.itemSelected) {
      this.itemSelected = 0
    } else {
      this.itemSelected = item;

    }
    this.totalInvestmentColapsed = !this.totalInvestmentColapsed;

  }


  refresh(){
    this.getPiipExpenses();
  };

  deleteRubric(rubricId:string){
     this.isLoading = !this.isLoading;
     this.expensesSvc.deleteRubric(this.codeSelected.id, rubricId)
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
           });
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

  loadInvestment(){
    const fd = new FormData();
    fd.append('file', this.selectedFile);
    fd.append('year', this.yearSelected.toString());
    this.isLoading = !this.isLoading;

    this.loadMatrixSvc.loadExpensesInvestments(fd)
        .subscribe({
          error:(err:any) => {
            this.isLoading = !this.isLoading;
            this.alertSvc.currentAlert('', err.error.message, 'error');
          },
          next:(resp:any) => {
            console.log(resp)
            this.alertSvc.currentAlert('Éxito', 'Matriz cargada', 'success');
            this.isLoading = !this.isLoading;
            this.selectedFile = null
            this.getPiipExpenses();
          }
        });
  };

}
