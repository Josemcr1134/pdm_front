import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IncomesService {

  constructor(private http:HttpClient, private authSvc:AuthService) { }

  getIncomes(year:number){
     const url = `${this.authSvc.baseUrl}/incomes/?year=${year}`;
     return this.http.get(url, this.authSvc.header);
  };

  updateIncomeDetail(id:string, data:{}){
    const url = `${this.authSvc.baseUrl}/incomes/${id}/add_income_details/`;
    return this.http.post(url, data, this.authSvc.header);
  };


}
