import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import {SignInComponent} from './userPages/sign-in/sign-in.component';
import {SignUpComponent} from './userPages/sign-up/sign-up.component';
import { AuthGuard } from "./shared/guard/auth.guard";

export const AppRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/ingresar',
        pathMatch: 'full'
      },
      {
        path: '',
        loadChildren:
          () => import('./material-component/material.module').then(m => m.MaterialComponentsModule)
      },
      {
        path: '',
        loadChildren:
          () => import('./pages/pages.module').then(m => m.PagesModule),
          canActivate: [AuthGuard]
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
       
      }
    ],
    canActivate: [AuthGuard]
  },
  {
    path:'ingresar',
    component: SignInComponent,
    pathMatch: 'full'
  },
  {
    path:'registarse',
    component:SignUpComponent
  }
];
