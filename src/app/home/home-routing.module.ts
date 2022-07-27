import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home2Component } from '../home2/home2.component';
import { VideogamesComponent } from '../videogames/videogames.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
{
  path: '',
  component: HomeComponent,
},
{
  path: 'videogames',
  component: VideogamesComponent,
},
{
  path: 'videogames/:id',
  component: VideogamesComponent,
},
{
  path: 'home2',
  component: Home2Component,
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
