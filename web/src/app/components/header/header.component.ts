import { Component, OnInit } from '@angular/core';
import { AuthTokenService } from "../../../services/auth/auth-token.service";
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  loggedIn: boolean;
  items: MenuItem[] = [];
  email: string = '';
  ngOnInit() {
    this.isLoggedIn();
    this.loadEmail();
    const role = localStorage.getItem('role');
     if (role === 'ADMIN' || role === 'EMPLOYEE') {
    this.items = [
      { label: `Zalogowano:  ${this.email}`, icon: 'pi pi-info' },
      { separator: true },
      { label: 'Mój profil', icon: 'pi pi-cog', routerLink: ['/myprofile'] }
    ];
  }
else if(role === 'COMPANY'){
  this.items = [
        { label: `Zalogowano:  ${this.email}`, icon: 'pi pi-info' },
        { separator: true },
        { label: 'Dashboard', icon: 'pi pi-cog', routerLink: ['/dashboard'] }
      ];
  }

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
    this.authTokenService.logout();
    location.reload();
  }
}
