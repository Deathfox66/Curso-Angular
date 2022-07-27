import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardService } from './services/guard.service';

const routes: Routes = [{
  path: 'login',
  loadChildren: () => import('./login/login.module').then((m) => m.LoginModule),
},
{
  path: 'home',
  canActivate: [GuardService],
  loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
},
{
  path: 'home2',
  loadChildren: () => import('./home2/home2.module').then((m) => m.Home2Module),
},
{
  path: '**',
  redirectTo: '/login'
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
