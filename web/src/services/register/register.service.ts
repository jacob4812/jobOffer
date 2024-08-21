import { Injectable } from '@angular/core';
import {RestService} from "../rest/rest.service";
import {Observable} from "rxjs";
import {UserRegisterDetails} from "../../app/dto/model/user/user-register-details";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private readonly registerUrl = 'auth/signup';
  constructor(private restService:RestService) { }

  register(userRegisterDetails: Omit<UserRegisterDetails, "repeatPassword">):Observable<void>{
    return this.restService.post(this.registerUrl,userRegisterDetails);
  }
}
