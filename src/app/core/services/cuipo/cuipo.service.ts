import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CuipoService {

  constructor(private http: HttpClient, private authSvc: AuthService) { }


  getCuipoData(bpin: string, limit: number, offset: number) {
    let params = new HttpParams();
    if (bpin) {
      params = params.set('bpin', bpin);
    }
    if (limit) {
      params = params.set('limit', limit);
    }
    if (offset) {
      params = params.set('offset', offset);
    }
    const url = `${this.authSvc.baseUrl}/soda-apis/cuipo-data`;
    return this.http.get(url, { headers: this.authSvc.header.headers, params });
  };
}
