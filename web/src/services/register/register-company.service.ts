import { Injectable } from '@angular/core';
import {RestService} from "../rest/rest.service";
import {Observable} from "rxjs";
import {CompanyRegisterDetails} from "../../app/dto/model/company/company-register-details";
@Injectable({
  providedIn: 'root'
})
export class RegisterCompanyService {
  private readonly registerUrl = 'auth/company/signup';
  constructor(private restService:RestService) { }


  registerCompany(companyRegisterDetails:Omit<CompanyRegisterDetails, "repeatPassword">):Observable<void>{
    return this.restService.post(this.registerUrl,companyRegisterDetails);
    }
}
