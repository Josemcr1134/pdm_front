import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OperatingExpensesService {

  constructor(private http:HttpClient, private authSvc:AuthService) { }

  getOperatingExpenses(entity_code:string, year:string){
    const url = `${this.authSvc.baseUrl}/operating-expenses/?entity_code=${entity_code}&year=${year}`;
    return this.http.get(url, this.authSvc.header);
  };

  addOperatingExpenseDetail(data:{}, id:string){
    const url = `${this.authSvc.baseUrl}/operating-expenses/${id}/add_operating_expense_details/`;
    return this.http.post(url, data, this.authSvc.header);
  };

  deleteOperatingExpenseSource(operatingId:string, sourceId:string){
    const url = `${this.authSvc.baseUrl}/operating-expenses/${operatingId}/delete_source_financing/?source_id=${sourceId}`;
    return this.http.delete(url, this.authSvc.header);
  };

  getInvestmentsExpenses(year:string, limit:number, offset:number){
    const url = `${this.authSvc.baseUrl}/investment-expenses/?year=${year}&limit=${limit}&offset=${offset}`;
    return this.http.get(url, this.authSvc.header);
  };

  addInvestmentsExpenseDetail(data:{}, id:string){
    const url = `${this.authSvc.baseUrl}/investment-expenses/${id}/add_investment_expense_details/`;
    return this.http.post(url, data, this.authSvc.header);
  };

  deleteInvestmentsExpenseSource(investmentsId:string, sourceId:string){
    const url = `${this.authSvc.baseUrl}/investment-expenses/${investmentsId}/delete_source_financing/?source_id=${sourceId}`;
    return this.http.delete(url, this.authSvc.header);
  };




}
