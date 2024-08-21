import { Injectable } from '@angular/core';
import {RestService} from "../rest/rest.service";
import {Observable} from "rxjs";
import {Page} from "../../app/models/page.model";
import {JobOffer} from "../../app/models/job-offer.model";

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private readonly offerUrl = 'offer';
  constructor(private restService: RestService) { }

  readAllJobOffers(page: number = 0, size: number = 10): Observable<Page<JobOffer>>{
    const url = `${this.offerUrl}/readAllJobOffers?page=${page}&size=${size}`;
    return this.restService.getPageable<Page<JobOffer>>(url);
  }


}
