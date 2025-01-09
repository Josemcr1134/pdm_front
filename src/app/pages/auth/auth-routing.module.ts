import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'recoverPassword',
    component: RecoverPasswordComponent
  },
  {
    path:'resetPassword/:token/:uId',
    component: ResetPasswordComponent
  },
  {
    path:'**',
    redirectTo:'login',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
