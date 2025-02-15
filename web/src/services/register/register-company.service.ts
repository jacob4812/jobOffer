import { Injectable } from '@angular/core';
import {RestService} from "../rest/rest.service";
import {catchError, Observable, throwError} from "rxjs";
import {CompanyRegisterDetails} from "../../app/dto/model/company/company-register-details";

interface RegistrationResponse {
  emailUsed: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class RegisterCompanyService {
  private readonly registerUrl = 'auth/company/signup';
  constructor(private restService:RestService) { }


  registerCompany(companyRegisterDetails:Omit<CompanyRegisterDetails, "repeatPassword">):Observable<RegistrationResponse>{
    return this.restService.post(this.registerUrl,companyRegisterDetails).pipe(
          catchError(err => {
            console.error('Błąd HTTP:', err);
            return throwError(() => err);
          })
        );
    }
}
