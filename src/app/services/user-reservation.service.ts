import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserReservation } from '../models/user-reservation.model';

const baseUrl = 'http://localhost:3000/api/users-reservations';

@Injectable({
  providedIn: 'root'
})
export class UserReservationService {

  constructor(private http: HttpClient) { }

  getAll(): Observable< UserReservation[]> {
    return this.http.get< UserReservation[]>(baseUrl);
  }

  create(data: UserReservation): Observable<any>{
    return this.http.post<UserReservation>(baseUrl, data);
  }
}
