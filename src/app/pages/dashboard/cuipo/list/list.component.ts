import { Component, OnInit } from '@angular/core';
import { CuipoService } from '../../../../core/services/cuipo/cuipo.service';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../../../shared/pagination/pagination.component';
import { LoaderComponent } from '../../../../shared/loader/loader.component';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from '../../../../shared/alert/alert.component';

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


  constructor(private cuipoSvc: CuipoService) { }


  ngOnInit(): void {
    this.getCuipoData();
  }

  getCuipoData() {
    this.loading = true;
    this.cuipoSvc.getCuipoData(this.bpin, this.limit, this.offset)
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
  }
}
