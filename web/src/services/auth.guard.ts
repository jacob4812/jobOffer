import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthTokenService } from './auth/auth-token.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthTokenService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isLoggedIn()) {
       const role = localStorage.getItem('role');
       if (route.routeConfig?.path === 'dashboard' && role !== 'COMPANY') {
          this.router.navigate(['/main'], { queryParams: { returnUrl: state.url } });
               return false;
       }
       if (route.routeConfig?.path === 'myprofile' && role !== 'ADMIN') {
                this.router.navigate(['/main'], { queryParams: { returnUrl: state.url } });
                     return false;
             }
      return true;
    } else {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }
}
