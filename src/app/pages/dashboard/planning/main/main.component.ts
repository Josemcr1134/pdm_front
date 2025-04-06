import { Component, OnInit } from '@angular/core';
import { ProgramCode } from '../../../../core/models/program-code.model';
import { StrategicLine } from '../../../../core/models/strategic-line.model';
import { Sector } from '../../../../core/models/sectors.model';
import { ProductGoal } from '../../../../core/models/product-goal.model';
import { PlanningService } from '../../../../core/services/planning/planning.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';


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
  public filterByDpt:string = '';
  public strategicLines: StrategicLine[] = [];
  public productGoals:ProductGoal[] = [];
  public productGoalsFiltered:ProductGoal[] = [];
  public sectors:Sector[] = [];
  public  programCodes: ProgramCode[] = [];
  public isLoading:boolean = false;
  public developmentPlan:any;
  public offset:number = 0;
  public totalItems:number = 0;
  public totalItemsGeneral:number = 0;
  searchControl = new FormControl('');
  public searchText: string  ='';
  public offsetGeneral:number = 0;
  constructor(private planningSvc:PlanningService, private router:Router, private activatedRoute:ActivatedRoute){
    this.searchControl.valueChanges.subscribe(value => {
      this.searchText = value?.toLowerCase() || '';
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params:any) =>{
      console.log(params)
      this.filterByDpt = params.filterByDpt;
      this.getDevelopmentPlan(params.filterByDpt)
    })

  };

  getDevelopmentPlan(filter:boolean){
    this.planningSvc.getDevelopmentPlan(filter)
        .subscribe({
          error:(err:any) => {
            console.log(err);
          },
          next:(resp:any) => {
            console.log(resp)
            this.developmentPlan = resp;
            this.getStrategicLines()
          }
        })
  }

  getStrategicLines(){
    this.isLoading = !this.isLoading;
    this.planningSvc.getStrategicLines(this.developmentPlan.id)
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
    if (value !== this.code) {
      this.offset = 0;
    }
    this.code = value;
    this.isLoading = !this.isLoading;
    this.planningSvc.getGoals(10, this.offset, this.code)
        .subscribe({
          error:(err:any) =>{
            console.log(err);
            this.isLoading = !this.isLoading;
          },
          next:(resp:any) => {
            console.log(resp)
            this.productGoals = resp.results;
            this.totalItems = resp.count
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

    this.planningSvc.getGoals(10, this.offsetGeneral)
        .subscribe({
          error:(err:any) =>{
            console.log(err);
            this.isLoading = !this.isLoading;
          },
          next:(resp:any) => {
            console.log(resp)
            this.productGoals = resp.results;
            this.totalItemsGeneral = resp.count;
            this.categoryTypeSelected = 2;
            this.productGoal = undefined
            this.isLoading = !this.isLoading;
          }
        });
  };

  goToDetail(){
    sessionStorage.setItem('productGoal', JSON.stringify(this.productGoal));
    this.router.navigateByUrl('/dashboard/planning/' + this.filterByDpt + '/detail/' + this.productGoal?.id);
  };

  onPageChange(event:number){
    this.offset = event;
    this.chooseCode(this.code);
  };


  onPageChangeGeneral(event:number){
    this.offset = event;
    this.getGeneralGoals();
  };


}
