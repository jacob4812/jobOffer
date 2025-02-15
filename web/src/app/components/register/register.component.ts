import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RegisterService } from '../../../services/register/register.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule]
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private router: Router
  ) {
    this.registerForm = this.fb.group(
      {
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email, Validators.maxLength(250)]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(25),
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,25}$/
            ),
          ],
        ],
        repeatPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  private passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('repeatPassword')?.value
      ? null
      : { mismatch: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { repeatPassword, ...userRegisterDetails } = this.registerForm.value;
      
      
      this.registerService.register(userRegisterDetails).subscribe({
        next: (response) => {
          if (response.emailUsed) {
            this.registerForm.get('email')?.setErrors({ emailUsed: true });
          } else {
            
            this.router.navigate(['/main']);
          }
        },
        error: (err) => {
          console.error('Wystąpił błąd podczas rejestracji:', err);
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }
  
}
