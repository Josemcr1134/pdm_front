import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IncomesService {

  constructor(private http:HttpClient, private authSvc:AuthService) { }

  getIncomes(year:number, month:any){
    let params = new HttpParams();
    if (month != 'null' && month != null) {
      params = params.set('month', month);
    }
     const url = `${this.authSvc.baseUrl}/incomes/?year=${year}`;
    return this.http.get(url, { headers: this.authSvc.header.headers, params });
  };

  updateIncomeDetail(id:string, data:{}){
    const url = `${this.authSvc.baseUrl}/incomes/${id}/add_income_details/`;
    return this.http.post(url, data, this.authSvc.header);
  };


  deleteSourceFinancing(incomeId:string, sourceId:string){
    const url = `${this.authSvc.baseUrl}/incomes/${incomeId}/delete_source_financing/?source_id=${sourceId}`;
    return this.http.delete(url, this.authSvc.header);
  };


}
