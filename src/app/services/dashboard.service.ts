import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserReservation } from '../models/user-reservation.model';
import { StorageService } from './storage.service';

const BASE_URL_DASHBOARD : string = 'http://localhost:3002/api/dashboard';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private access_token : string = this.storageService.getJWT();

  private newHttpOptions = {
    headers : new HttpHeaders({ 'Content-Type': 'application/json' }).set('Authorization', `Bearer ${this.access_token}`)
  }

  constructor(
    private readonly http : HttpClient,
    private readonly storageService : StorageService
  ) {}

  getAll(): Observable< UserReservation[]> {
    return this.http.get<UserReservation[]>(
      BASE_URL_DASHBOARD,
      this.newHttpOptions
    );
  }

  edit(data : UserReservation) : Observable< UserReservation> {
    const res = this.http.patch<UserReservation>(
      BASE_URL_DASHBOARD + '/update',
      data,
      this.newHttpOptions
    );

    console.log(res);

    return res;
  }

  confirmReservation(idReservation : number) : Observable<any>{
    const res = this.http.patch<any>(
      BASE_URL_DASHBOARD + '/confirm-reservation',
      {idReservation},
      this.newHttpOptions
    );

    console.log(res);
    return res;
  }
}
