import { Injectable } from '@angular/core';
import { RestService } from '../rest/rest.service';
import {Observable} from "rxjs";
import {Page} from "../../app/models/page.model";
import { JobOffer } from 'src/app/models/job-offer.model';
import { Company } from 'src/app/models/company.model';
import { CompanyDataUpdate } from 'src/app/dto/model/company/company-data-update';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private readonly companyUrl = 'company';
  constructor(private restService: RestService) { }

  readCompanyJobOffers(userId:number,page: number = 0, size: number = 10): Observable<Page<JobOffer>>{
    const url = `${this.companyUrl}/readCompanyJobOffers/${userId}?page=${page}&size=${size}`;
    return this.restService.getPageable<Page<JobOffer>>(url);
  }
  readCompanyData(userId: number): Observable<Company>{
  const url = `${this.companyUrl}/readCompanyData/${userId}`;
  return this.restService.get(url);
  }
  updateCompanyData(companyDataUpdate: Company):Observable<Company>{
     const url = `${this.companyUrl}/updateCompanyData`;
      return this.restService.put(url,companyDataUpdate);
  }
}
