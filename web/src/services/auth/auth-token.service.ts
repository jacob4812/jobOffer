import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {
  constructor(private router: Router) {}

  isLoggedIn(): boolean {
    const localStorageToken = localStorage.getItem("token");
    const sessionStorageToken = sessionStorage.getItem("token");
    return !!(localStorageToken || sessionStorageToken);
  }
  setLocalStorageToken(token: string) {
    localStorage.setItem("token", token);
  }

  setSessionStorageToken(token: string) {
    sessionStorage.setItem("token", token);
  }
  logout(): void {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/main']);
  }

  removeToken() {
    localStorage.clear();
    sessionStorage.clear();
  }

  getToken() {
    const localStorageToken = localStorage.getItem("token");
    const sessionStorageToken = sessionStorage.getItem("token");
    if (localStorageToken) {
      return localStorageToken;
    } else {
      return sessionStorageToken;
    }
  }
}
