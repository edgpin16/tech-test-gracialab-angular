import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { StorageService } from '../services/storage.service';
import { AuthService } from '../services/auth.service';

export function authGuard( redirectRoute: string): CanActivateFn {
  return () => {
    const storageService: StorageService = inject(StorageService);
    const routerService : Router = inject(Router);
    const authService : AuthService = inject(AuthService);

    let flag : boolean = false;
    if(storageService.isLoggedIn()){
      console.log("Exists userkey in session storage")
      flag = true;
      authService.verifyJWT();
    }

    return flag || routerService.createUrlTree([redirectRoute]);

  };
}
