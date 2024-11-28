import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import {Router, RouterLink} from "@angular/router";
import {RegisterCompanyService} from "../../../services/register/register-company.service";

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './registercompany.component.html',
  styleUrls: ['./registercompany.component.scss'],
  imports: [ReactiveFormsModule, RouterLink]
})
export class RegisterCompanyComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder,
              private registerCompanyService: RegisterCompanyService,
              private router: Router) {
    this.registerForm = this.fb.group({
      companyName: ['', Validators.required],
      nip: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  private passwordMatchValidator(g: FormGroup) {
    return g.get('password')!.value === g.get('repeatPassword')!.value
      ? null : { 'mismatch': true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { repeatPassword, ...companyRegisterDetails } = this.registerForm.value;
      this.registerCompanyService.registerCompany(companyRegisterDetails).subscribe(
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
