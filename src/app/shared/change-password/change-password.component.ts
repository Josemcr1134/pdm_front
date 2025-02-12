import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { AlertsService } from '../../core/services/alerts/alerts.service';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoaderComponent
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent implements OnInit {
  public passwordForm!: FormGroup;
  @Output() close = new EventEmitter<boolean>();
  public isLoading:boolean = false;


  constructor(private authSvc:AuthService, private alertSvc:AlertsService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      current_password: ['', Validators.required],
      new_password1: ['', Validators.required],
      new_password2: ['', Validators.required],
    }, {
      validators: this.passwordsMatch
    });
  }

  passwordsMatch(group: FormGroup) {
    const new_password1 = group.get('new_password1')?.value;
    const new_password2 = group.get('new_password2')?.value;
    return new_password1 === new_password2 ? null : { notMatching: true };
  }

  changePassword() {
    if (this.passwordForm.valid) {
      this.isLoading = !this.isLoading;
      this.authSvc.changePassword(this.passwordForm.value)
          .subscribe({
            error:(err:any) => {
              this.alertSvc.handleErrors(err);
              this.isLoading = !this.isLoading;
            },
            next:(resp:any) => {
              this.alertSvc.currentAlert('Éxito', 'Contraseña modificada correctamente', 'success');
              this.goAway();
              this.isLoading = !this.isLoading;
            }
          })
    } else {
      this.alertSvc.currentAlert('', 'Formulario inválido', 'info')
    };
  };

  goAway(){
    this.close.emit(true);
  };
}
