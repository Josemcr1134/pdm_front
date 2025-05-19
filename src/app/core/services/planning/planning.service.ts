import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { StrategicLine } from '../../models/strategic-line.model';
import { Sector } from '../../models/sectors.model';
import { ProgramCode } from '../../models/program-code.model';
import { ProductGoal } from '../../models/product-goal.model';

@Injectable({
  providedIn: 'root'
})
export class PlanningService {

  constructor(private http:HttpClient, private authSvc:AuthService) { }


  getStrategicLines(developPlan:string){
    const url = `${this.authSvc.baseUrl}/pdm/strategic-line/?development_plan_id=${developPlan}`;
    return this.http.get<StrategicLine[]>(url, this.authSvc.header);
  };

  getSectors(strategicLine:string){
    const url = `${this.authSvc.baseUrl}/pdm/sector/?strategic_line_id=${strategicLine}`;
    return this.http.get<Sector[]> (url, this.authSvc.header);
  };

  getCodeAndProgram(sectorId:string){
    const url = `${this.authSvc.baseUrl}/pdm/code-and-program/?sector_id=${sectorId}`;
    return this.http.get<ProgramCode[]>(url, this.authSvc.header);
  };

  getGoals(limit:number, offset:number, codeId?:string){
    let params = new HttpParams();
    if (codeId) {
      params = params.set('code_and_program_id', codeId);
    }


    const url = `${this.authSvc.baseUrl}/pdm/goal/?offset=${offset}&limit=${limit}`;
    return this.http.get<ProductGoal[]>(url, { headers: this.authSvc.header.headers, params });
  };

  getYears(){
    const url = `${this.authSvc.baseUrl}/pdm/development-plan/years-of-plan-execution/`;
    return this.http.get(url, this.authSvc.header);
  };

  getScheduledGoal(goalId:string, year:number){
    const url = `${this.authSvc.baseUrl}/pdm/goal/${goalId}/scheduled/?year=${year}`;
    return this.http.get(url, this.authSvc.header);
  };


  getExecutedGoal(goalId:string, year:number){
    const url = `${this.authSvc.baseUrl}/pdm/goal/${goalId}/executed/?year=${year}`;
    return this.http.get(url, this.authSvc.header);
  }

  getStatistics(goalId:string){
    const url = `${this.authSvc.baseUrl}/pdm/goal/${goalId}/statistics/`;
    return this.http.get(url, this.authSvc.header);
  };


  getContractExecutionUnits(limit:number, offset:number){
    const url = `${this.authSvc.baseUrl}/contracts/execution-unit/?limit=${limit}&offset=${offset}`;
    return this.http.get(url, this.authSvc.header);
  };

  getCatalogProduct(code:string, limit:number, offset:number, search:string){
    const url = `${this.authSvc.baseUrl}/catalogue/product-mga/?limit=${limit}&offset=${offset}&code_mga=${code}&search=${search}`;
    return this.http.get(url, this.authSvc.header)
  };

  getModality(limit:number, offset:number){
    const url = `${this.authSvc.baseUrl}/modality/?limit=${limit}&offset=${offset}`;
    return this.http.get(url, this.authSvc.header);
  };

  getWellnessCatalogue(limit:number, offset: number, search:string){
    const url = `${this.authSvc.baseUrl}/catalogue/wellness/?limit=${limit}&offset=${offset}&search=${search}`;
    return this.http.get(url, this.authSvc.header);
  };

  createContract(data:{}){
    const url = `${this.authSvc.baseUrl}/contracts/`;
    return this.http.post(url, data, this.authSvc.header);
  };


  deleteContract(id:string){
    const url = `${this.authSvc.baseUrl}/contracts/${id}/`;
    return this.http.delete(url, this.authSvc.header);
  };


  getContracts(limit:number, offset:number, year:number, goal:string){
    const url = `${this.authSvc.baseUrl}/contracts/?limit=${limit}&offset=${offset}&year=${year}&goal=${goal}`;
    return this.http.get(url, this.authSvc.header);
  };

  getContractById(id:string){
    const url = `${this.authSvc.baseUrl}/contracts/${id}/`;
    return this.http.get(url, this.authSvc.header);
  };

  addSourceFinancing(data:{}){
    const url = `${this.authSvc.baseUrl}/contracts/contract-product-contracted-source-financing/`;
    return this.http.post(url, data, this.authSvc.header);
  };

  deleteSourceFinancing(id:string){
    const url = `${this.authSvc.baseUrl}/contracts/contract-product-contracted-source-financing/${id}/`;
    return this.http.delete(url, this.authSvc.header);
  };

  getCoverage(limit:number, offset:number, goalSelected:string){
    const url = `${this.authSvc.baseUrl}/coverage/?limit=${limit}&offset=${offset}&goal=${goalSelected}`;
    return this.http.get(url, this.authSvc.header);
  };

  updateCoverage(data:{}, id:string){
    const url = `${this.authSvc.baseUrl}/coverage/${id}/`;
    return this.http.patch(url, data, this.authSvc.header);
  };

  getDevelopmentPlan(isDpt:boolean){
    const url = `${this.authSvc.baseUrl}/pdm/development-plan/active/?is_department=${isDpt}`;
    return this.http.get(url, this.authSvc.header);
  };

  createContractDownloadable(data:{}){
    const url = `${this.authSvc.baseUrl}/contracts/generate-project-bank-certificate/`;
    return this.http.post(url,data, this.authSvc.header);
  };

  getContractDownloadable(id:string){
    const url = `${this.authSvc.baseUrl}/contracts/generate-project-bank-certificate/${id}/`;
    return this.http.get(url, this.authSvc.header);
  };

  updateBpin(data:{}, goalId:string){
    const url = `${this.authSvc.baseUrl}/pdm/goal/${goalId}/bpin/`;
    return this.http.put(url, data, this.authSvc.header);
  };

  createGoalExecuted(goalId:string, year:number, data:{}){
    const url = `${this.authSvc.baseUrl}/pdm/goal/${goalId}/executed/?year=${year}`;
    return this.http.post(url,data, this.authSvc.header);
  };

  updateGoalExecuted(goalId:string, year:number, data:{}){
    const url = `${this.authSvc.baseUrl}/pdm/goal/${goalId}/executed/?year=${year}`;
    return this.http.patch(url,data, this.authSvc.header);
  };

  createGoalScheduled(goalId:string, year:number, data:{}){
    const url = `${this.authSvc.baseUrl}/pdm/goal/${goalId}/scheduled/?year=${year}`;
    return this.http.post(url,data, this.authSvc.header);
  };

  updateGoalScheduled(goalId:string, year:number, data:{}){
    const url = `${this.authSvc.baseUrl}/pdm/goal/${goalId}/scheduled/?year=${year}`;
    return this.http.patch(url,data, this.authSvc.header);
  };


  updateContract(id:string, data:{}){
    const url = `${this.authSvc.baseUrl}/contracts/${id}/`;
    return this.http.patch(url, data, this.authSvc.header);
  };

  updateResponsableUser(data:{},id:string){
    const url = `${this.authSvc.baseUrl}/company/${id}/`;
    return this.http.patch(url, data, this.authSvc.header);
  };

  getProductClasification(search:string){
    const url = `${this.authSvc.baseUrl}/contracts/product-classification/?limit=200&offset=0`;
    return this.http.get(url, this.authSvc.header);
  };
}
