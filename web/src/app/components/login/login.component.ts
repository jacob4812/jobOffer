import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.maxLength(250),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(25),
        ],
      ],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.onLogin(this.loginForm.value).subscribe({
        next: () => {
          this.errorMessage = null;
        },
        error: () => {
          this.errorMessage = 'Nieprawidłowe dane logowania';
        },
      });
    } else {
      this.errorMessage = 'Formularz jest niepoprawny!';
    }
  }
}
