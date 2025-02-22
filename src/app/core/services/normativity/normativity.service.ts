import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NormativityService {
  private baseUrl: string;
  private headers: any;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.baseUrl = this.authService.baseUrl;
    this.headers = this.authService.header;
  }

  getAllNormativity(type:string) {
    return this.http.get(`${this.baseUrl}/normativity/?normative_type=${type}`,  this.headers );
  }

  getNormativityById(id: string) {
    return this.http.get(`${this.baseUrl}/normativity/${id}/`,  this.headers );
  }

  getAllDescriptions(sector:string) {
    return this.http.get(`${this.baseUrl}/normativity/description/?normative_sector=${sector}`,  this.headers );
  }

  getDescriptionById(id: string) {
    return this.http.get(`${this.baseUrl}/normativity/description/${id}/`,  this.headers );
  }

  getAllSectors() {
    return this.http.get(`${this.baseUrl}/normativity/sector/`,  this.headers );
  }

  getSectorById(id: string) {
    return this.http.get(`${this.baseUrl}/normativity/sector/${id}/`,  this.headers );
  }

  getAllTypes(desc:string) {
    return this.http.get(`${this.baseUrl}/normativity/type/?normative_description=${desc}`,  this.headers );
  }

  getTypeById(id: string) {
    return this.http.get(`${this.baseUrl}/normativity/type/${id}/`,  this.headers );
  }
}
