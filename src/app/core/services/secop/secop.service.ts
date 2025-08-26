import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SecopService {

  constructor(private http: HttpClient, private authSvc: AuthService) { }

  getSecopList(fecha_de_firma_del_contrato: any, limit: number, offset: number, nom_raz_social_contratista: string, numero_del_contrato: string) {
    let params = new HttpParams();
    if (fecha_de_firma_del_contrato) {
      params = params.set('fecha_de_firma_del_contrato', fecha_de_firma_del_contrato);
    }
    if (nom_raz_social_contratista) {
      params = params.set('nom_raz_social_contratista', nom_raz_social_contratista);
    }
    if (numero_del_contrato) {
      params = params.set('numero_del_contrato', numero_del_contrato);
    }
    if (limit) {
      params = params.set('limit', limit);
    }
    if (offset) {
      params = params.set('offset', offset);
    }

    const url = `${this.authSvc.baseUrl}/soda-apis/secop-data/`;
    return this.http.get(url, { headers: this.authSvc.header.headers, params });
  };

}
