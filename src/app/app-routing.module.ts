import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { HomeComponent } from './home/home.component';
import { UsersReservationsComponent } from './users-reservations/users-reservations.component';
import { PageResponseComponent } from './users-reservations/components/page-response/page-response.component';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  { path : '', component : HomeComponent },
  { path : 'users-reservations', component : UsersReservationsComponent },
  { path : 'users-reservations/response', component : PageResponseComponent},
  { path : 'login', component: LoginComponent },
  { path : '**', component : PagenotfoundComponent, pathMatch : 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
