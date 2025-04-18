import { Component, OnInit } from '@angular/core';
import { MetricsService } from '../../../../core/services/metrics/metrics.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {
  public data:any;
  public strategicLines:any[] = [];
  public strategicLineSelected:any = null;
  public sectors:any[] = [];
  public sectorSelected:any = null;
  public codeAndPrograms:any[] = [];
  public codeAndProgramSelected:any = null;
  public goals:any[] = [];
  public goalSelected:any[] = [];
  public isLoading:boolean = false;
  public executedTotal: number = 0;
  public pendingTotal: number = 0;
  public rubricExpenseSum:any;
  ngOnInit(): void {
    this.getInfo();

  }

  constructor(private metricsSvc:MetricsService){}

  getInfo(){
    this.isLoading = true
    this.metricsSvc.getPanelInfo()
      .subscribe({
        error:(err:any) => {
          console.log(err);
          this.isLoading = false;
          this.getRubricExpenseSum();
          this.getStrategicLineExpenseSum();
        },
        next:(resp:any) => {
          this.data = resp;
          this.strategicLines = resp.strategic_lines;
           this.getRubricExpenseSum();
  //  this.getStrategicLineExpenseSum();
        }
      })
  };

  chooseStrategicLine(){
    this.sectorSelected = null;
    this.codeAndProgramSelected = null;
  };

  chooseSector(){
    this.codeAndProgramSelected = null;
  };

  getRubricExpenseSum(){
    this.isLoading = true
    this.metricsSvc.getRubricExpenseSum()
      .subscribe({
        error:(err:any) => {
          console.log(err);
          this.isLoading = false;
        },
        next:(resp:any) => {
          console.log(resp)
          this.rubricExpenseSum = resp;
          this.isLoading = false;
          }
        })
  };

  getStrategicLineExpenseSum(){
    this.isLoading = true
    this.metricsSvc.getStrategicLineExpenseSum()
      .subscribe({
        error:(err:any) => {
          console.log(err);
          this.isLoading = false;
        },
        next:(resp:any) => {
          console.log(resp)
          this.isLoading = false;
        }
      })
  }


}
