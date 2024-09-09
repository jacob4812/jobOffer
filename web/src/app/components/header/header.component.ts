import { Component, OnInit } from '@angular/core';
import { AuthTokenService } from "../../../services/auth/auth-token.service";
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loggedIn: boolean;
  items: MenuItem[] = [];
  email: string = '';
  ngOnInit() {
    this.isLoggedIn();
    this.loadEmail();
    this.items = [

      { label: `Zalogowano:  ${this.email}`, icon: 'pi pi-info', url: 'http://angular.io' },
      { separator: true },
      { label: 'Dodaj CV' },
      { separator: true },
      { label: 'Setup', icon: 'pi pi-cog', routerLink: ['/setup'] }
    ];

  }
  constructor(
    public authTokenService: AuthTokenService,
  ) {
    this.loggedIn = false;
  }
  save(severity: string) {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("idUser");
    this.email = '';
    this.loggedIn = false;
  }
  isLoggedIn() {
    const token = localStorage.getItem("token");
    this.loggedIn = !!token;
  }
  loadEmail() {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      this.email = storedEmail;
    } else {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const parsedToken = JSON.parse(token);
          this.email = parsedToken.email || '';
        } catch (error) {
          console.error('Error parsing token:', error);
          this.email = 'Unknown';
        }
      }
    }
  }
  logout(severity: string) {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("idUser");
    this.email = '';
    this.loggedIn = false;
  }
}
