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

  private experienceFilterSubject = new BehaviorSubject<string[]>([]);
  experienceFilter$ = this.experienceFilterSubject.asObservable();

  private technologyFilterSubject = new BehaviorSubject<string[]>([]);
  technologyFilter$ = this.technologyFilterSubject.asObservable();

  private positionFilterSubject = new BehaviorSubject<string[]>([]);
  positionFilter$ = this.positionFilterSubject.asObservable();

  updateSearchCriteria(criteria: any) {
    this.searchCriteriaSubject.next(criteria);
  }

 updateExperienceFilter(selectedExperienceLevels: string[]) {
   this.experienceFilterSubject.next(selectedExperienceLevels);
 }
 updateTechnologyFilter(selectedTechnologies: string[]) {
  this.technologyFilterSubject.next(selectedTechnologies);
}
updatePositionFilter(selectedPositionsLevels: string[]) {
  console.log("search service "+selectedPositionsLevels);
  this.positionFilterSubject.next(selectedPositionsLevels);
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

     if (searchData.salaryMin) {
       url += `salaryMin=${searchData.salaryMin}&`;
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
 searchJobOffersWithFilters(selectedPositionsLevels: string[]) {
  let url = 'offer/filter/position?';


  if (selectedPositionsLevels && selectedPositionsLevels.length > 0) {

    url += `positions=${selectedPositionsLevels.join(',')}&`;
  }


  url = url.endsWith('&') ? url.slice(0, -1) : url;


  this.rest.get(url).subscribe(
    (response: any) => {
      console.log('Filtered job offers:', response);
    },
    (error) => {
      console.error('Error searching job offers:', error);
    }
  );
}


}
