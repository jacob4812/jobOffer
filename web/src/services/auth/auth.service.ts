import { Injectable } from '@angular/core';
import { RestService } from "../rest/rest.service";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  invalidLogin = false;
  helper = new JwtHelperService();

  constructor(private router: Router, private restService: RestService) {}

  onLogin(form: any): Observable<any> {
    return this.restService.post("login", form).pipe(
      map((response: any) => {
        if (response) {
          this.invalidLogin = false;
          const decodedToken = this.helper.decodeToken(response.tokenContent);

          localStorage.setItem("token", response.tokenContent);
          localStorage.setItem("email", decodedToken.sub);
          localStorage.setItem("idUser", decodedToken.idUser);
          localStorage.setItem("role", decodedToken.role[0].authority);

          this.router.navigate([""]);
        }
        return response;
      }),
      catchError((error) => {
        this.invalidLogin = true;
        console.error('Login error:', error);
        return throwError(() => new Error('Nieprawidłowe dane logowania'));
      })
    );
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem("token");
    return token ? !this.helper.isTokenExpired(token) : false;
  }


  logout(): void {
    localStorage.clear();
    this.router.navigate(["/login"]);
  }
}
