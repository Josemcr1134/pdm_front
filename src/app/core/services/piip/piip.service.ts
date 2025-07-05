import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PiipService {

  constructor(private http:HttpClient, private authSvc:AuthService) { }

  getSectors(){
    const url = `${this.authSvc.baseUrl}/piip/sector-piip/`;
    return this.http.get(url, this.authSvc.header);
  };

  getBpinBySector(sectorId:string){
    const url = `${this.authSvc.baseUrl}/piip/bpin-name-project/?sector_id=${sectorId}`;
    return this.http.get(url, this.authSvc.header);
  };

  getSpecificObjectiveByBpin(bpin:string){
    const url = `${this.authSvc.baseUrl}/piip/specific-objective/?bpin_name_project_id=${bpin}`;
    return this.http.get(url, this.authSvc.header);
  };

  getCodeProduct(specificObjective:string, search:string){
    const url = `${this.authSvc.baseUrl}/piip/code-product/?specific_objective_id=${specificObjective}&search=${search}`;
    return this.http.get(url, this.authSvc.header);
  };


  // META VIGENCIA

  getGoalConcurrency(codeProductId:string, year:number){
    const url = `${this.authSvc.baseUrl}/piip/code-product/${codeProductId}/goal-concurrency/?year=${year}`;
    return this.http.get(url, this.authSvc.header);
  };

  newGoalConcurrency(codeProductId:string, data:{}){
    const url = `${this.authSvc.baseUrl}/piip/code-product/${codeProductId}/goal-concurrency/`;
    return this.http.post(url, data,  this.authSvc.header);
  };

  updateGoalConcurrency(codeProductId:string, data:{}){
    const url = `${this.authSvc.baseUrl}/piip/code-product/${codeProductId}/goal-concurrency/`;
    return this.http.patch(url, data,  this.authSvc.header);
  };

  // AVANCE EJECUTADO

  getProgressMade(codeProductId:string, year:number){
    const url = `${this.authSvc.baseUrl}/piip/code-product/${codeProductId}/progress-made/?year=${year}`;
    return this.http.get(url, this.authSvc.header);
  };

  newProgressMade(codeProductId:string, data:{}){
    const url = `${this.authSvc.baseUrl}/piip/code-product/${codeProductId}/progress-made/`;
    return this.http.post(url, data,  this.authSvc.header);
  };

  updateProgressMade(codeProductId:string, data:{}){
    const url = `${this.authSvc.baseUrl}/piip/code-product/${codeProductId}/progress-made/`;
    return this.http.patch(url, data,  this.authSvc.header);
  };

  getPiipExpenses(year:number, month:any, limit:number, offset:number){
    let params = new HttpParams();
    if (month != 'null' && month != null) {
      params = params.set('month', month);
    }
    if ( limit != null) {
      params = params.set('limit', limit);
    }
    if ( offset != null) {
      params = params.set('offset', offset);
    }
    const url = `${this.authSvc.baseUrl}/expense-piip/?year=${year}`;
    return this.http.get(url, { headers: this.authSvc.header.headers, params });
  }

}
