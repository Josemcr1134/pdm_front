import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CuipoService {

  constructor(private http: HttpClient, private authSvc: AuthService) { }


  getCuipoData(bpin: string, limit: number, offset: number, nom_seccion_presupuestal: string, nom_vigencia_del_gasto: string, period: string, quarter: string) {
    let params = new HttpParams();
    console.log(period)
    if (nom_seccion_presupuestal) {
      params = params.set('nom_seccion_presupuestal', nom_seccion_presupuestal);
    }
    if (nom_vigencia_del_gasto) {
      params = params.set('nom_vigencia_del_gasto', nom_vigencia_del_gasto);
    }
    if (period) {
      params = params.set('period', period);
    }
    if (quarter) {
      params = params.set('quarter', quarter);
    }
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
