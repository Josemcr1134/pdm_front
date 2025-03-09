import { Component, OnInit } from '@angular/core';
import { IncomesService } from '../../../../core/services/incomes/incomes.service';
import { AlertsService } from '../../../../core/services/alerts/alerts.service';
import { PlanningService } from '../../../../core/services/planning/planning.service';
import { LoadMatrixService } from '../../../../core/services/load-matrix/load-matrix.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit{
  public yearSelected:number = 2024;
  public years:any;
  public incomes:any[]=[];
  public isLoading:boolean = false;
  public showIncomeDetail:boolean = false;
  public incomeDetail:any;
  constructor(private incomesSvc:IncomesService, private pdmSvc:PlanningService, private loadMatrixSvc:LoadMatrixService, private alertSvc:AlertsService){}

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

  loadInvestment(){
    const fd = new FormData();
    fd.append('file', this.selectedFile);
    fd.append('year', this.yearSelected.toString());
    this.isLoading = !this.isLoading;

    this.loadMatrixSvc.loadIncomeData(fd)
        .subscribe({
          error:(err:any) => {
            this.isLoading = !this.isLoading;
            this.alertSvc.currentAlert('', 'Revisa si el formato de matriz se encuentra cargado', 'error');
          },
          next:(resp:any) => {
            console.log(resp)
            this.alertSvc.currentAlert('Éxito', 'Matriz cargada', 'success');
            this.isLoading = !this.isLoading;
            this.selectedFile = null
            this.getIncomes();
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
