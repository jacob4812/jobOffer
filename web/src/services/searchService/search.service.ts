import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RestService } from '../rest/rest.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private rest: RestService) { }
  
  private searchCriteriaSubject = new BehaviorSubject<any>(null);
  searchCriteria$ = this.searchCriteriaSubject.asObservable();

  updateSearchCriteria(criteria: any) {
    this.searchCriteriaSubject.next(criteria);
  }

  clearSearchCriteria() {
    this.searchCriteriaSubject.next(null);
  }
  searchJobOffers(searchData: any) {
    let url = 'offer/search?';

    
     if (searchData.title) {
       url += `title=${searchData.title}&`;
     }
     if (searchData.description) {
       url += `description=${searchData.description}&`;
     }
     if (searchData.location) {
       url += `location=${searchData.location}&`;
     }

     if (searchData.salary) {
       url += `salary=${searchData.salary}&`;
     }

     
     url = url.endsWith('&') ? url.slice(0, -1) : url;

     this.rest.get(url).subscribe(
       (response: any) => {
         console.log('Found job offers:', response);
       },
       (error) => {
         console.error('Error searching job offers:', error);
       }
     );
 }
}
