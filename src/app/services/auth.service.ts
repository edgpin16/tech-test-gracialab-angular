import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL_AUTH = 'http://localhost:3001/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credentials : {email : string, password : string}): Observable<any> {
    return this.http.post(
      BASE_URL_AUTH + 'login',
      credentials,
      httpOptions
    );
  }
}
