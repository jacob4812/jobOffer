import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {
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
