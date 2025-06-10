import { Component, OnInit } from '@angular/core';
import { SecopService } from '../../../../core/services/secop/secop.service';
import { PlanningService } from '../../../../core/services/planning/planning.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
  public year:number = 2025;
  public limit:number = 10;
  public totalItems:number = 0;
  public offset:number = 0;
  public search:string = '';
  public isLoading:boolean = false;
  public Secop:any[] = [];
  public Years:any;
  public nom_raz_social_contratista:string  = '';
  public numero_del_contrato:string  = '';
  constructor(private secopSvc:SecopService, private planningSvc:PlanningService){}

  ngOnInit(): void {
    this.getYears();
  }

  getSecopList(){
    this.isLoading = !this.isLoading;
    this.secopSvc.getSecopList(this.year, this.limit, this.offset, this.nom_raz_social_contratista, this.numero_del_contrato)
          .subscribe({
            error:(err:any) => {
              console.log(err);
              this.isLoading = !this.isLoading;
            },
            next:(resp:any) => {
              this.Secop = resp.results;
              this.totalItems = resp.count;
              this.isLoading = !this.isLoading;
            }
          })
  };

  getYears(){
    this.planningSvc.getYears()
        .subscribe({
          error:(err:any) => {
            console.log(err);
          },
          next:(resp:any) => {
            this.Years = resp;
            this.year = resp.first_year;
            this.getSecopList();
          }
        });
  };

  onPageChange(event:any){
    this.offset = event;
    this.getSecopList();
  }
}
