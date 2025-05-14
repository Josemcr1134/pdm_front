import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PaaService {

  constructor(private http:HttpClient, private authSvc:AuthService) { }


  getAcquisitionsContracts(year:number){
    const url = `${this.authSvc.baseUrl}/contracts/acquisitions/?year=${year}`;
    return this.http.get(url, this.authSvc.header);
  };
}
