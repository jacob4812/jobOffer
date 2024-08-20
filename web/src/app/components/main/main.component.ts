import {Component, OnInit} from '@angular/core';
import {AuthTokenService} from "../../../services/auth/auth-token.service";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  standalone:true,
  imports: [CommonModule]
})
export class MainComponent implements OnInit{
  loggedIn: boolean;
  ngOnInit() {
    this.isLoggedIn();
  }
  constructor(
    public authTokenService:AuthTokenService,
  ) {
    this.loggedIn = false;
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
