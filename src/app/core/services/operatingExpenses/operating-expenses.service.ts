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

}
