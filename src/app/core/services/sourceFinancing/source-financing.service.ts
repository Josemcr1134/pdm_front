import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SourceFinancingService {

  constructor(private http:HttpClient, private authSvc:AuthService) { }


  getSourceFinancing(filter_by_homologation:boolean, search:string){
    let params = new HttpParams();
    if (filter_by_homologation) {
      params = params.set('filter_by_homologation', filter_by_homologation);
    };
    if (search) {
      params = params.set('search', search);
    };
    const url = `${this.authSvc.baseUrl}/source-financing/`;
    return this.http.get(url,  { headers: this.authSvc.header.headers, params });
  };
  getSourceFinancingByGoal(goal:string){
    let params = new HttpParams();

    if (goal) {
      params = params.set('goal', goal);
    };
    const url = `${this.authSvc.baseUrl}/source-financing/list-by-meta/`;
    return this.http.get(url,  { headers: this.authSvc.header.headers, params });
  };
}
