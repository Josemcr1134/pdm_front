import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CertificateConsultationService {

  constructor(private http: HttpClient, private authSvc: AuthService) { }

  getExportHistory(limit: number, offset: number, year: number, contract_id: string) {
    const url = `${this.authSvc.baseUrl}/contracts/export-history?limit=${limit}&offset=${offset}&year=${year}&contract_id=${contract_id}`;
    return this.http.get(url, this.authSvc.header);
  };

  getCertificateDetails(id: string) {
    const url = `${this.authSvc.baseUrl}/contracts/export-history/${id}`;
    return this.http.get(url, this.authSvc.header);
  };
}
