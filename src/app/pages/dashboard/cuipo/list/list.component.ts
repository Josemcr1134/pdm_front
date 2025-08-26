import { Component, OnInit } from '@angular/core';
import { CuipoService } from '../../../../core/services/cuipo/cuipo.service';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../../../shared/pagination/pagination.component';
import { LoaderComponent } from '../../../../shared/loader/loader.component';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from '../../../../shared/alert/alert.component';
import { PlanningService } from '../../../../core/services/planning/planning.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PaginationComponent,
    LoaderComponent,
    AlertComponent
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
  public limit: number = 20;
  public offset: number = 0;
  public totalItems: number = 0;
  public Data: any[] = [];
  public loading: boolean = false;
  public bpin: string = '';
  public years: any;
  public yearSelected: any = 2025;
  public nom_seccion_presupuestal: string = '';
  public nom_vigencia_del_gasto: string = '';
  public quarter: string = '';
  constructor(private cuipoSvc: CuipoService, private pdmSvc: PlanningService) { }


  ngOnInit(): void {
    this.getYears();
  }

  getCuipoData() {
    this.loading = true;
    this.cuipoSvc.getCuipoData(this.bpin, this.limit, this.offset, this.nom_seccion_presupuestal, this.nom_vigencia_del_gasto, this.yearSelected, this.quarter)
      .subscribe({
        error: (err) => { },
        next: (resp: any) => {
          this.Data = resp.results;
          this.totalItems = resp.count;
          this.loading = false;
        }
      });
  };

  onPageChange(event: any) {
    this.offset = event;
    this.getCuipoData();
  };

  getYears() {
    this.loading = !this.loading;
    this.pdmSvc.getYears()
      .subscribe({
        error: (err: any) => {
          console.log(err);
          this.loading = !this.loading;
        },
        next: (resp: any) => {
          this.years = resp;
          this.yearSelected = resp.second_year;
          this.loading = !this.loading;
          this.getCuipoData();
        }
      });
  };
}
