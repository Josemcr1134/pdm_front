import { Component, OnInit } from '@angular/core';
import { ProgramCode } from '../../../../core/models/program-code.model';
import { StrategicLine } from '../../../../core/models/strategic-line.model';
import { Sector } from '../../../../core/models/sectors.model';
import { ProductGoal } from '../../../../core/models/product-goal.model';
import { PlanningService } from '../../../../core/services/planning/planning.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {
  categoryTypeSelected:number = 1;
  public strategicLine:string = '';
  public productGoal!:ProductGoal | undefined;
  public sector:string = '';
  public code:string = '';
  public strategicLines: StrategicLine[] = [];
  public productGoals:ProductGoal[] = [];
  public sectors:Sector[] = [];
  public  programCodes: ProgramCode[] = [];
  public isLoading:boolean = false;

  constructor(private planningSvc:PlanningService){}

  ngOnInit(): void {
    this.getStrategicLines();
  }

  getStrategicLines(){
    this.isLoading = !this.isLoading;
    this.planningSvc.getStrategicLines()
        .subscribe({
          error:(err:any) => {
            console.log(err)
            this.isLoading = !this.isLoading;
          },
          next:(resp:StrategicLine[]) => {
            console.log(resp)
            this.strategicLines = resp;
            this.isLoading = !this.isLoading;
            }
          })
  }

  chooseStrategicLine(value:string){
    this.isLoading = !this.isLoading;
    this.strategicLine = value;
    this.planningSvc.getSectors(this.strategicLine)
          .subscribe({
            error:(err:any) =>{
              console.log(err)
              this.isLoading = !this.isLoading;
            },
            next:(resp:Sector[]) => {
              this.sectors = resp;
              this.sector = '';
              this.code = '';
              this.productGoal = undefined;
              this.isLoading = !this.isLoading;
            }
          })
  };

  chooseSector(value:string){
    this.isLoading = !this.isLoading;
    this.sector = value;
    this.planningSvc.getCodeAndProgram(this.sector)
        .subscribe({
          error:(err:any) => {
            console.log(err)
            this.isLoading = !this.isLoading;
          },
          next:(resp:ProgramCode[]) => {
            this.code = '';
            this.programCodes = resp;
            this.productGoal = undefined;
            this.isLoading = !this.isLoading;
            }
          })
  };

  chooseCode(value:string){
    this.code = value;
    this.isLoading = !this.isLoading;
    this.planningSvc.getGoals(this.code)
        .subscribe({
          error:(err:any) =>{
            console.log(err);
            this.isLoading = !this.isLoading;
          },
          next:(resp:ProductGoal[]) => {
            console.log(resp)
            this.productGoals = resp;
            this.productGoal = undefined;
            this.isLoading = !this.isLoading;
          }
        });
  };

  chooseProductGoal(goal:ProductGoal){
    console.log(goal)
    this.productGoal = goal;
  };

  getGeneralGoals(){
    this.isLoading = !this.isLoading;

    this.planningSvc.getGoals()
    .subscribe({
      error:(err:any) =>{
        console.log(err);
        this.isLoading = !this.isLoading;
      },
      next:(resp:ProductGoal[]) => {
        console.log(resp)
        this.productGoals = resp;
        this.categoryTypeSelected = 2
        this.productGoal = undefined
        this.isLoading = !this.isLoading;
      }
    });
  }
}
