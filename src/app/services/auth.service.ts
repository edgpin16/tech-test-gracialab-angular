import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

const BASE_URL_AUTH = 'http://localhost:3001/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly http: HttpClient,
    private readonly storageService : StorageService,
    private readonly router : Router
  ) {}

  login(credentials : {email : string, password : string}): Observable<any> {
    return this.http.post(
      BASE_URL_AUTH + 'login',
      credentials,
      httpOptions
    );
  }

  public logout() : any{
    this.storageService.clean();
    this.router.navigate(['']);
  }

  public verifyJWT() : boolean {
    const access_token : string = this.storageService.getJWT();

    const newHttpOptions = {
      headers : new HttpHeaders({ 'Content-Type': 'application/json' }).set('Authorization', `Bearer ${access_token}`)
    }

    const response = this.http.post(
      BASE_URL_AUTH + 'verify-jwt',
      {},
      newHttpOptions
    ).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: ( error ) => {
        const {message, name} = error;
        console.log({
          message,
          name,
          error
        });
        }
      });

      //Puede ser que me devuelva un boolean true si el token es valido
      //O un observable si el token es invalido
      //Por eso si es un boolean, es 100% que sea true
      //ya que en caso de error, no devuelve un boolean
      return typeof response === 'boolean';

      //if(typeof response === 'boolean') return true; return false;
  }
}
