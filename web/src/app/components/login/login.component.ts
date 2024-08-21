import { Component } from '@angular/core';
import {ReactiveFormsModule, FormBuilder, FormGroup, FormsModule} from '@angular/forms';
import {AuthService} from "../../../services/auth/auth.service";
import { NgForm } from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,private authService:AuthService) {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  onSubmit(loginForm: NgForm){
     this.authService.onLogin(loginForm.value);
  }
}
