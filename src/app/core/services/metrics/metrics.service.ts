import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MetricsService {

  constructor(private http:HttpClient, private authSvc:AuthService) { }


  getPanelInfo(){
    const url = `${this.authSvc.baseUrl}/control-panel/get-info/`;
    return this.http.get(url, this.authSvc.header);
  };

  getRubricExpenseSum(){
    const url = `${this.authSvc.baseUrl}/control-panel/rubric-expense-sum/`;
    return this.http.get(url, this.authSvc.header);
  };

  getStrategicLineExpenseSum(){
    const url = `${this.authSvc.baseUrl}/control-panel/strategic-line-expense-sum-by-year/`;
    return this.http.get(url, this.authSvc.header);
  };

}
