import {Component, OnInit} from '@angular/core';
import {AuthTokenService} from "../../../services/auth/auth-token.service";
import { CommonModule } from '@angular/common';
import {MenuItem} from 'primeng/api';
import {SplitButtonModule} from "primeng/splitbutton";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit{
  loggedIn: boolean;
  items: MenuItem[] = [];
  ngOnInit() {
    this.isLoggedIn();
    this.items =[

      {label: 'Angular.io', icon: 'pi pi-info', url: 'http://angular.io'},
      {separator:true},
      {label: 'Setup', icon: 'pi pi-cog', routerLink: ['/setup']}
    ];
  }
  constructor(
    public authTokenService:AuthTokenService,
  ) {
    this.loggedIn = false;
  }
  save(severity: string) {
    console.log("data");
  }
  isLoggedIn(){
    const token = localStorage.getItem("token");
    this.loggedIn = !!token;
  }
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("idUser");

  }
}
