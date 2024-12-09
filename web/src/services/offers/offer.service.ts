import { Injectable } from '@angular/core';
import { RestService } from "../rest/rest.service";
import { Observable } from "rxjs";
import { Page } from "../../app/models/page.model";
import { JobOffer } from "../../app/models/job-offer.model";

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private readonly offerUrl = 'offer';

  constructor(private restService: RestService) { }

  readAllJobOffers(page: number = 0, size: number = 10): Observable<Page<JobOffer>> {
    const url = `${this.offerUrl}/readAllJobOffers?page=${page}&size=${size}`;
    return this.restService.getPageable<Page<JobOffer>>(url);
  }

  addJobOffer(offer: JobOffer): Observable<JobOffer> {
    const url = `${this.offerUrl}/addJobOffer`;
    return this.restService.post(url, offer);
  }

  deleteJobOffer(offerId: number): Observable<void> {
    const url = `${this.offerUrl}/deleteJobOffer/${offerId}`;
    return this.restService.delete(url);
  }
  editJobOffer(offer: JobOffer): Observable<JobOffer> {
    const url = `${this.offerUrl}/editJobOffer`;
    return this.restService.put(url, offer);
  }

}
