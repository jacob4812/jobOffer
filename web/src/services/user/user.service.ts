import { Injectable } from '@angular/core';
import { RestService } from '../rest/rest.service';
import { User } from 'src/app/dto/model/user/user/user.model';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly userUrl = 'user';
  constructor(private restService: RestService) { }

  readUserData(userId: number): Observable<User>{
    const url = `${this.userUrl}/readUserDetails/${userId}`;
    return this.restService.get(url);
    }
    
    updateUserData(userData: User):Observable<User>{
      const url = `${this.userUrl}/updateUserData`;
       return this.restService.put(url,userData);
   }
}
