import { Component, OnInit } from '@angular/core';
import { OperatingExpensesService } from '../../../../../core/services/operatingExpenses/operating-expenses.service';
import { AlertsService } from '../../../../../core/services/alerts/alerts.service';
import { ActivatedRoute } from '@angular/router';
import { LoadMatrixService } from '../../../../../core/services/load-matrix/load-matrix.service';

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
  public showContractModal:boolean = false;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params:any) => {
      this.year = params.year;
      this.executionCode = params.executionCode;
      this.getExpenses();
    })
  }

  constructor(private loadMatrixSvc:LoadMatrixService, private alertSvc:AlertsService,  private expensesSvc:OperatingExpensesService, private activatedRoute:ActivatedRoute){}

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
            this.showContractModal= false;
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


  loadInvestment(){
    const fd = new FormData();
    fd.append('file', this.selectedFile);
    fd.append('year', this.year);
    fd.append('entity', localStorage.getItem('executionId') || '');
    this.isLoading = !this.isLoading;

    this.loadMatrixSvc.loadExpensesOperation(fd)
        .subscribe({
          error:(err:any) => {
            this.isLoading = !this.isLoading;
            this.alertSvc.currentAlert('',  err.error.message, 'error');
          },
          next:(resp:any) => {
            console.log(resp)
            this.alertSvc.currentAlert('Éxito', 'Matriz cargada', 'success');
            this.isLoading = !this.isLoading;
            this.selectedFile = null
            this.getExpenses();
          }
        });
  };

  selectedFile: File | any = null;

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
}
