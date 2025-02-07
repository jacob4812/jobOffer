import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JobDetailDialogComponent } from '../job-detail-dialog/job-detail-dialog.component';
import { OfferService } from "../../../services/offers/offer.service";
import { PaginatorState } from "primeng/paginator";
import { JobOffer } from "../../models/job-offer.model";
import { Page } from "../../models/page.model";
import { ApplyJobComponent } from '../apply-job/apply-job.component';
import { SearchService } from 'src/services/searchService/search.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styles: []
})
export class JobListComponent implements OnInit {
  jobOffers: JobOffer[] = [];
  allOffers: JobOffer[] = [];
  filteredOffers: JobOffer[] = [];
  searchedOffers: JobOffer[] = [];
  first = 0;
  rows = 10;
  totalRecords = 0;
  role: string = '';
  searchCriteria: any = null;
  experienceFilter:any = null;
 
  constructor(
    public dialog: MatDialog,
    private offerService: OfferService,
    private searchService: SearchService
  ) { }

  ngOnInit() {
    this.role = localStorage.getItem('role') || '';
    this.searchService.searchCriteria$.subscribe((criteria) => {
      this.searchCriteria = criteria;
      this.filterOffers();
    });
    this.searchService.experienceFilter$.subscribe((experienceFilter) => {
      this.experienceFilter = experienceFilter;
      this.filterOffers();
    });
    this.readJobOffers();
  }

  openJobDetailDialog(offer: JobOffer) {
    this.dialog.open(JobDetailDialogComponent, { data: offer });
  }

  openApplyJobComponent(offer: JobOffer) {
    this.dialog.open(ApplyJobComponent, { data: offer });
  }


  readJobOffers() {
    this.offerService.readAllJobOffers(0, 1000).subscribe((response) => {
      this.allOffers = response.content;
      this.filterOffers();
    });
  }


  filterOffers() {
    if(!this.experienceFilter){
      this.searchedOffers = [...this.allOffers];
    }
    if (!this.searchCriteria) {
      this.filteredOffers = [...this.allOffers];
    } else {
      this.filteredOffers = this.allOffers.filter(offer => {
        return (!this.searchCriteria.title || offer.title?.toLowerCase().includes(this.searchCriteria.title.toLowerCase())) &&
               (!this.searchCriteria.location || offer.location?.toLowerCase().includes(this.searchCriteria.location.toLowerCase())) &&
               (!this.searchCriteria.salary || offer.salary >= this.searchCriteria.salary) &&
               (!this.searchCriteria.company || this.searchCriteria.company.length === 0 || this.searchCriteria.company.includes(offer.company)) &&
               (!this.searchCriteria.description || offer.description?.toLowerCase().includes(this.searchCriteria.description.toLowerCase())) &&
               (!this.experienceFilter || this.experienceFilter.length === 0 || this.experienceFilter.includes(offer.offerExperience.toString()));
    });
    }

    this.totalRecords = this.filteredOffers.length;
    this.first = 0;
    this.paginateFilteredOffers();
    console.log('Selected experience levels:', this.experienceFilter);

  }


  paginateFilteredOffers() {
    const start = this.first;
    const end = start + this.rows;
    this.jobOffers = this.filteredOffers.slice(start, end);
  }


  onPageChange(event: PaginatorState) {
    this.first = event.first;
    this.paginateFilteredOffers();
  }
}
