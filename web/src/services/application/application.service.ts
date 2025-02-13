import { Injectable } from '@angular/core';
import { RestService } from '../rest/rest.service';
import {Observable} from "rxjs";
import {Page} from "../../app/models/page.model";
import { Application } from 'src/app/models/application.model';
import { ApplicationRequest } from 'src/app/models/applicationRequest.model';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private baseUrl = 'http://localhost:8080/api/applications';
  constructor(private restService: RestService,private http: HttpClient) { }

  readMyApplications(role:string,userId: number,page: number = 0, size: number = 10): Observable<Page<Application>>{
    const url = `${this.baseUrl}/${role}/${userId}?page=${page}&size=${size}`;
    return this.restService.getPageable<Page<Application>>(url);
  }
  applyForJob(applicationRequest:ApplicationRequest):Observable<String>{
    const formData = new FormData();
formData.append("userId", applicationRequest.userId.toString());
formData.append("offerId", applicationRequest.offerId.toString());
formData.append("companyId", applicationRequest.companyId.toString());
formData.append("file", applicationRequest.file );
formData.append("status", applicationRequest.status); 

// Dodajemy plik CV, jeśli jest dostępny
if (applicationRequest.file) {
  formData.append("file", applicationRequest.file, applicationRequest.file.name);
}
return this.http.post(this.baseUrl, formData,{ responseType: 'text' });
}
}
