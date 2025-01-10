import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  public showMobileMenu:boolean = false;
  public showProfileMenu:boolean = false;
  public userName:string = '';
  constructor() { }

  ngOnInit() {
    this.userName = sessionStorage.getItem('userName') || '';
  }

  closeMobileMenu(event:any) {
    this.showMobileMenu = !this.showMobileMenu;
  }
}
