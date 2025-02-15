import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RegisterCompanyService } from '../../../services/register/register-company.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './registercompany.component.html',
  styleUrls: ['./registercompany.component.scss'],
  imports: [ReactiveFormsModule, RouterModule, CommonModule]
})
export class RegisterCompanyComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private registerCompanyService: RegisterCompanyService,
    private router: Router
  ) {
    this.registerForm = this.fb.group(
      {
        companyName: ['', Validators.required],
        nip: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10), 
          Validators.maxLength(10)]],
        phoneNumber: ['', [
          Validators.required, 
          Validators.pattern('^[0-9]*$'), 
          Validators.minLength(9), 
          Validators.maxLength(9)
        ]],
        
        email: ['', [Validators.required, Validators.email, Validators.maxLength(250)]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(25),
            Validators.pattern(
              // Hasło musi zawierać co najmniej 1 dużą literę, 1 małą literę, 1 cyfrę i 1 znak specjalny
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,25}$/
            ),
          ],
        ],
        repeatPassword: ['', Validators.required]
      },
      { validators: this.passwordMatchValidator }
    );
  }

  private passwordMatchValidator(g: FormGroup) {
    const password = g.get('password')?.value;
    const repeatPassword = g.get('repeatPassword')?.value;
    return password === repeatPassword ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { repeatPassword, ...companyRegisterDetails } = this.registerForm.value;
      this.registerCompanyService.registerCompany(companyRegisterDetails).subscribe({
        next: (response) => {
          if (response.emailUsed) {
            this.registerForm.get('email')?.setErrors({ emailUsed: true });
          }else{
            console.log('Registration successful');
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
  validateNumberInput(event: KeyboardEvent, maxLength: number): void {
    const input = event.target as HTMLInputElement;
    
    
    if (!/^\d$/.test(event.key)) {
      event.preventDefault();
    }
  
    
    if (input.value.length >= maxLength) {
      event.preventDefault();
    }
  }
}
