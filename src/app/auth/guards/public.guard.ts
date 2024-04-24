import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable, map, of, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';


export const isAuthActivateGuard: CanActivateFn = ( //Hay que tener en cuenta el tipado CanActiveFn
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return checkAuthStatus(state.url);
};

const checkAuthStatus = (path: string): Observable<boolean> => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.checkAuthentication()
    .pipe(
      tap((isAuthenticated) => console.log('Authenticated', isAuthenticated)),
      tap((isAuthenticated) => { if (isAuthenticated) router.navigate(["./"]) }),
      map((isAuthenticated) => !isAuthenticated)//retorna false al no estar autenticado, por eso cambiamos a true para permitir paso
    );
}
