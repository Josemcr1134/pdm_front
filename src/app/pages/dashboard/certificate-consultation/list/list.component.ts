import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CertificateConsultationService } from '../../../../core/services/certificateConsultation/certificate-consultation.service';
import { PlanningService } from '../../../../core/services/planning/planning.service';
import { LoaderComponent } from '../../../../shared/loader/loader.component';
import { AlertComponent } from '../../../../shared/alert/alert.component';
import { PaginationComponent } from '../../../../shared/pagination/pagination.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LoaderComponent,
    AlertComponent,

    PaginationComponent

  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
  public isLoading: boolean = false;
  public certificatesConsultation: any[] = [];
  public totalCertificatesConsultation: number = 0;
  public limit: number = 10;
  public offset: number = 0;
  public yearSelected: number = new Date().getFullYear();

  public years: any = null;


  ngOnInit(): void {
    this.getYears();
  }
  constructor(private certificateConsultationSvc: CertificateConsultationService, private pdmSvc: PlanningService) { }

  getContractsHistory() {
    this.isLoading = !this.isLoading;
    this.certificateConsultationSvc.getExportHistory(this.limit, this.offset, this.yearSelected, '')
      .subscribe({
        error: (err: any) => {
          console.log(err);
          this.isLoading = !this.isLoading;
        },
        next: (resp: any) => {
          console.log(resp);
          this.certificatesConsultation = resp.results;
          this.totalCertificatesConsultation = resp.count;
          this.isLoading = !this.isLoading;
        }
      });
  };


  getYears() {
    this.isLoading = !this.isLoading;
    this.pdmSvc.getYears()
      .subscribe({
        error: (err: any) => {
          console.log(err);
          this.isLoading = !this.isLoading;
        },
        next: (resp: any) => {
          this.years = resp;
          this.yearSelected = resp.second_year;
          this.isLoading = !this.isLoading;
          this.getContractsHistory();
        }
      });
  };

  onPageChange(event: any) {
    this.offset = event;
    this.getContractsHistory();
  }
}
