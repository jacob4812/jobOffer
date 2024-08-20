import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {RegisterService} from "../../../services/register.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [ReactiveFormsModule]
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
    }, { validators: this.passwordMatchValidator }); // Add the custom validator here
  }

  // Password matching validator
  private passwordMatchValidator(g: FormGroup) {
    return g.get('password')!.value === g.get('repeatPassword')!.value
      ? null : { 'mismatch': true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { repeatPassword, ...userRegisterDetails } = this.registerForm.value; // Exclude repeatPassword from payload
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
