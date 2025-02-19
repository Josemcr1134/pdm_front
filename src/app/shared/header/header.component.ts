import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { MobileMenuComponent } from '../mobile-menu/mobile-menu.component';

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
  constructor() { }

  ngOnInit() {
    this.userName = sessionStorage.getItem('userName') || '';
  }

  closeMobileMenu(event:any) {
    this.showMobileMenu = !this.showMobileMenu;
  }
}
