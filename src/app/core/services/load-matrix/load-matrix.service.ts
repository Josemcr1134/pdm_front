import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoadMatrixService {

  constructor(private authSvc:AuthService, private http:HttpClient) { }


  loadExpensesInvestments(data:FormData){
    const url = `${this.authSvc.baseUrl}/load/investment-expense-data/`;
    return this.http.post(url, data, this.authSvc.header);
  };

  loadExpensesOperation(data:FormData){
    const url = `${this.authSvc.baseUrl}/load/operation-expense-data/`;
    return this.http.post(url, data, this.authSvc.header);
  };

  loadIncomeData(data:FormData){
    const url = `${this.authSvc.baseUrl}/load/income-data/`;
    return this.http.post(url, data, this.authSvc.header);
  };


}
