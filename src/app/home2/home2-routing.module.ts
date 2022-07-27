import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from '../contacts/contacts.component';
import { Home2Component } from './home2.component';

const routes: Routes = [
  {
    path: '',
    component: Home2Component,
  },
  {
    path: 'contacts',
    component: ContactsComponent,
  },
  {
    path: 'contacts/:id',
    component: ContactsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Home2RoutingModule { }
