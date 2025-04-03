import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { AlertsService } from '../../../core/services/alerts/alerts.service';
import { loginResponse } from '../../../core/models/login-response.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public username:string = '';
  public password:string = '';
  public isLoading:boolean = false;

  constructor(private authSvc:AuthService, private alertSvc:AlertsService, private router:Router){}


  login(){
    const data = {
      username:this.username,
      password:this.password
    };
    if (this.username.length && this.password.length) {
      this.isLoading = !this.isLoading;
      this.authSvc.login(data)
          .subscribe({
            error:(err:any) => {
              this.alertSvc.handleErrors(err)
              this.isLoading = !this.isLoading;
            },
            next:(resp:loginResponse) => {
              this.alertSvc.currentAlert('Éxito', 'Bienvenido a PDM', 'success');
              sessionStorage.setItem('accessToken', resp.access);
              sessionStorage.setItem('refreshToken', resp.refresh);
              sessionStorage.setItem('username', resp.user.full_name);
              sessionStorage.setItem('email', resp.user.email);
              sessionStorage.setItem('userCompanyId', resp.user.company?.id);
              sessionStorage.setItem('userCompanyName', resp.user.company?.name);
              this.router.navigateByUrl('/dashboard');
              this.isLoading = !this.isLoading;
            }
          });
    } else {
      this.alertSvc.currentAlert('', 'Debes ingresar tus credenciales de usuario para ingresar', 'info')
    }
  };

}
