import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit {
  codeSelected:any = null;
  ngOnInit(): void {

    this.codeSelected =   JSON.parse(localStorage.getItem('codeSelected')|| '');
    console.log(this.codeSelected)

  }
}
