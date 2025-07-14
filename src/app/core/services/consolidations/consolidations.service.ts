import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ConsolidationsService {

  constructor(private http:HttpClient, private authSvc:AuthService) { }

  getConsolidations(limit:number, offset:number){
    const url = `${this.authSvc.baseUrl}/conversion-report?limit=${limit}&offset=${offset}`;
    return this.http.get(url, this.authSvc.header);
  };


}
