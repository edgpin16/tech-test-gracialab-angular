import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { HomeComponent } from './home/home.component';
import { UsersReservationsComponent } from './users-reservations/users-reservations.component';

const routes: Routes = [
  { path : '', component : HomeComponent },
  { path : 'users-reservations', component : UsersReservationsComponent },
  { path : '**', component : PagenotfoundComponent, pathMatch : 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
