import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import {Router, RouterLink} from "@angular/router";
import {RegisterService} from "../../../services/register/register.service";

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [ReactiveFormsModule, RouterLink]
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder,
              private registerService: RegisterService,
              private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  // Password matching validator
  private passwordMatchValidator(g: FormGroup) {
    return g.get('password')!.value === g.get('repeatPassword')!.value
      ? null : { 'mismatch': true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { repeatPassword, ...userRegisterDetails } = this.registerForm.value;
      this.registerService.register(userRegisterDetails).subscribe(
        () => {
          console.log('Registration successful');
          this.router.navigate(['/main']);
        },
        error => {
          console.error('Registration error', error);

        }
      );
    } else {
      console.error('Form is invalid');
    }
  }
}
