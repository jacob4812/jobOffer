import { Injectable } from '@angular/core';
import {RestService} from "../rest/rest.service";
import {catchError, Observable, throwError} from "rxjs";
import {UserRegisterDetails} from "../../app/dto/model/user/user-register-details";
interface RegistrationResponse {
  emailUsed: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private readonly registerUrl = 'auth/signup';
  constructor(private restService:RestService) { }

  register(userRegisterDetails: Omit<UserRegisterDetails, "repeatPassword">): Observable<RegistrationResponse> {
    return this.restService.post(this.registerUrl, userRegisterDetails).pipe(
      catchError(err => {
        console.error('Błąd HTTP:', err);
        return throwError(() => err);
      })
    );
  }
}
