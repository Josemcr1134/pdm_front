import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
    // canActivate:[AuthGuard]
  },
  {
    path:'**',
    redirectTo:'',
    pathMatch:'full'
  }
];
