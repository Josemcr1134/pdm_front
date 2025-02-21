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


  getStrategicLines(){
    const url = `${this.authSvc.baseUrl}/pdm/strategic-line/`;
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

  getGoals(codeId?:string){
    let params = new HttpParams();
    if (codeId) {
      params = params.set('code_and_program_id', codeId);
    }
    const url = `${this.authSvc.baseUrl}/pdm/goal/`;
    return this.http.get<ProductGoal[]>(url, { headers: this.authSvc.header.headers, params });
  };


  getYears(){
    const url = `${this.authSvc.baseUrl}/pdm/development-plan/years-of-plan-execution/`;
    return this.http.get(url, this.authSvc.header);
  };




}
