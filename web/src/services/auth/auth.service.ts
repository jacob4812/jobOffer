import { Injectable } from '@angular/core';
import {RestService} from "../rest/rest.service";
import {catchError,Observable} from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  invalidLogin = false;
    helper = new JwtHelperService();
  constructor(private router: Router,private restService:RestService) { }

  onLogin(form:any){
    this.restService.post("login",form)
      .pipe(
        catchError(async (error) =>{
        this.invalidLogin = true;
        throw error;
  }),
      )
      .subscribe((response)=>{
        if(response){
          this.invalidLogin = false
            const decodedToken = this.helper.decodeToken(response.tokenContent);
          console.log(response.tokenContent);
          console.log(decodedToken);
          localStorage.setItem("token",response.tokenContent);
          localStorage.setItem("email",decodedToken.sub);
          localStorage.setItem("idUser",decodedToken.idUser);

        }
          this.router.navigate([""]);

      });

  }
}
