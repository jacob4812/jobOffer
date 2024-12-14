import { Injectable } from '@angular/core';
import { RestService } from '../rest/rest.service';
import {Observable} from "rxjs";
import {Page} from "../../app/models/page.model";
import { Application } from 'src/app/models/application.model';
import { ApplicationRequest } from 'src/app/models/applicationRequest.model';
@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
private readonly applicationUrl = 'applications';
  constructor(private restService: RestService) { }

  readMyApplications(userId: number,page: number = 0, size: number = 10): Observable<Page<Application>>{
    const url = `${this.applicationUrl}/user/${userId}?page=${page}&size=${size}`;
    return this.restService.getPageable<Page<Application>>(url);
  }
  applyForJob(applicationRequest:ApplicationRequest):Observable<Application>{
    return this.restService.post(this.applicationUrl,applicationRequest);
  }
}
