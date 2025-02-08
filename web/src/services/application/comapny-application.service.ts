import { Injectable } from '@angular/core';
import { CompanyApplication } from 'src/app/models/company-application.model';
import { Page } from 'src/app/models/page.model';
import { RestService } from '../rest/rest.service';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CompanyApplicationService {
  private readonly companyApplicationUrl = 'applications';
  constructor(private restService: RestService) { }

  readCompanyApplications(role: string ,userId: number,page: number = 0, size: number = 10): Observable<Page<CompanyApplication>>{
    const url = `${this.companyApplicationUrl}/${role}/${userId}?page=${page}&size=${size}`;
    return this.restService.getPageable<Page<CompanyApplication>>(url);
  }
}
