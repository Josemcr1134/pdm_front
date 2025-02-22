import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { MobileMenuComponent } from '../mobile-menu/mobile-menu.component';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    ChangePasswordComponent,
    MobileMenuComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  public showMobileMenu:boolean = false;
  public showProfileMenu:boolean = false;
  public showChangePasswordModal:boolean = false;
  public userName:string = '';
  public userCompany:string = '';
  constructor(private authSvc:AuthService) { }

  ngOnInit() {
    this.getUser();
    this.userName = sessionStorage.getItem('userName') || '';
  }

  closeMobileMenu(event:any) {
    this.showMobileMenu = !this.showMobileMenu;
  }


  getUser(){
    this.authSvc.getUserInfo()
        .subscribe({
          error:(err:any) => {
            console.log(err);
          },
          next:(resp:any) => {
            console.log(resp)
            this.userName = resp.full_name;
            this.userCompany = resp.company.name
          }
        });
  };
}
