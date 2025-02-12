import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { loginResponse } from '../../models/login-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public baseUrl:string = environment.baseUrl;
  public get  header() {
    return {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
      }
    }
  };
  constructor(private http:HttpClient) { }


  login(data:{}){
    const url = `${this.baseUrl}/auth/login/`;
    return this.http.post<loginResponse>(url, data);
  };

  changePassword(data:{}){
    const url = `${this.baseUrl}/auth/change-password/`;
    return this.http.post(url, data, this.header)
  };

}
