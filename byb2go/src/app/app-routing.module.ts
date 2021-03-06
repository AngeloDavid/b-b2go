import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "./shared/guard/auth.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'firstpage',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'servicio/:id',
    loadChildren: () => import('./service/service.module').then( m => m.ServicePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'trabajador/:id/:idser',
    loadChildren: () => import('./worker/worker.module').then( m => m.WorkerPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./user/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./user/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./user/profile/profile.module').then( m => m.ProfilePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'firstpage',
    loadChildren: () => import('./user/firstpage/firstpage.module').then( m => m.FirstpagePageModule)
  },
  {
    path: 'order',
    loadChildren: () => import('./order/order.module').then( m => m.OrderPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'payment',
    loadChildren: () => import('./user/payment/payment.module').then( m => m.PaymentPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'payment/new',
    loadChildren: () => import('./user/payment/new/new.component').then( m => m.NewComponent),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
