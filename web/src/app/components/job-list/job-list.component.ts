import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JobDetailDialogComponent } from '../job-detail-dialog/job-detail-dialog.component';
import { OfferService } from "../../../services/offers/offer.service";
import { PaginatorState } from "primeng/paginator";
import { JobOffer } from "../../models/job-offer.model";
import { ApplyJobComponent } from '../apply-job/apply-job.component';
import { SearchService } from 'src/services/searchService/search.service';
import { Position } from 'src/app/models/position';
import { Experience } from 'src/app/models/experience';
import { Technology } from 'src/app/models/technology';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
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
  experienceFilter: any = null;
  technologyFilter: any = null;
  positionFilter: any = null;

  constructor(
    public dialog: MatDialog,
    private offerService: OfferService,
    private searchService: SearchService
  ) { }

  ngOnInit() {
    this.role = localStorage.getItem('role') || '';


    this.readJobOffers();


    this.searchService.searchCriteria$.subscribe(criteria => {
      this.searchCriteria = criteria;
      this.applySearch();
    });


    this.searchService.experienceFilter$.subscribe(experienceFilter => {
      this.experienceFilter = experienceFilter;

      this.applyFilters();
    });
    this.searchService.technologyFilter$.subscribe(technologyFilter => {
      this.technologyFilter = technologyFilter;
      this.applyFilters();
    });
    this.searchService.positionFilter$.subscribe(positionFilter => {
      this.positionFilter = positionFilter;

      this.applyFilters();
    });
  }

  openJobDetailDialog(offer: JobOffer) {
    this.dialog.open(JobDetailDialogComponent, { data: offer });
  }

  openApplyJobComponent(offer: JobOffer) {
    this.dialog.open(ApplyJobComponent, { data: offer });
  }


  readJobOffers() {
    this.offerService.readAllJobOffers(0, 1000).subscribe(response => {
      this.allOffers = response.content;
      this.searchedOffers = [...this.allOffers];
      this.applyFilters();
    });
  }


  applySearch() {
    if (!this.searchCriteria) {
      this.searchedOffers = [...this.allOffers];
    } else {
      this.searchedOffers = this.allOffers.filter(offer =>
        (!this.searchCriteria.title || offer.title?.toLowerCase().includes(this.searchCriteria.title.toLowerCase())) &&
        (!this.searchCriteria.location || offer.location?.toLowerCase().includes(this.searchCriteria.location.toLowerCase())) &&
        (!this.searchCriteria.salaryMin || offer.salaryMin >= this.searchCriteria.salaryMin) &&
        (!this.searchCriteria.company || this.searchCriteria.company.length === 0 || this.searchCriteria.company.includes(offer.company)) &&
        (!this.searchCriteria.description || offer.description?.toLowerCase().includes(this.searchCriteria.description.toLowerCase()))
      );
    }
    this.applyFilters();
  }


  applyFilters() {
    this.filteredOffers = this.searchedOffers.filter(offer =>

      (!this.experienceFilter || this.experienceFilter.length === 0 || this.experienceFilter.some((exp: Experience) => offer.offerExperience.includes(exp))) &&


      (!this.positionFilter || this.positionFilter.length === 0 || this.positionFilter.some((pos: Position) => offer.offerPosition.includes(pos))) &&


      (!this.technologyFilter || this.technologyFilter.length === 0 || this.technologyFilter.some((tech: Technology) => offer.offerTechnology.includes(tech)))
    );


    this.totalRecords = this.filteredOffers.length;
    this.first = 0;
    this.paginateFilteredOffers();
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
