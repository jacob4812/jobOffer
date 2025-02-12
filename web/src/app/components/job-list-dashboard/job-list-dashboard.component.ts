import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DashboardJobDetailDialogComponent } from '../job-detail-dialog-dashboard/job-detail-dialog-dashboard.component';
import { OfferService } from "../../../services/offers/offer.service";
import { PaginatorState } from "primeng/paginator";
import { JobOffer } from "../../models/job-offer.model";
import { Page } from "../../models/page.model";
import { HttpErrorResponse } from '@angular/common/http';
import { CompanyService } from 'src/services/company/company.service';
import { Company } from 'src/app/models/company.model';
import { SearchService } from 'src/services/searchService/search.service';
import { Experience } from 'src/app/models/experience';
import { Position } from 'src/app/models/position';
import { Technology } from 'src/app/models/technology';

@Component({
  selector: 'app-job-list-dashboard',
  templateUrl: './job-list-dashboard.component.html',
  styleUrls: ['./job-list-dashboard.component.scss']
})
export class DashboardJobListComponent implements OnInit {
  jobOffers: JobOffer[] = [];
  allOffers: JobOffer[] = [];
  filteredOffers: JobOffer[] = [];
  searchedOffers: JobOffer[] = [];
  first = 0;
  rows = 10;
  totalRecords = 0;
  totalPages = 0;
  expandedDescriptions: Set<number> = new Set();
  company: Company[] =[];
  searchCriteria: any = null;
  experienceFilter: any = null;
  technologyFilter: any = null;
  positionFilter: any = null;
  role: string = '';
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

  constructor(
    public dialog: MatDialog,
    private companyService: CompanyService,
    private offerService: OfferService,
    private searchService: SearchService
  ) { }






  toggleDescription(offer: JobOffer): void {
    if (this.expandedDescriptions.has(offer.id)) {
      this.expandedDescriptions.delete(offer.id);
    } else {
      this.expandedDescriptions.add(offer.id);
    }
  }

  openJobDetailDialog(offer: JobOffer) {
    this.dialog.open(DashboardJobDetailDialogComponent, {
      data: offer
    });
  }
  deleteJobOffer(offerId: number): void {

    if (confirm("Czy na pewno?")) {
      this.offerService.deleteJobOffer(offerId).subscribe({
        next: () => {
          this.jobOffers = this.jobOffers.filter(offer => offer.id !== offerId);
          this.totalRecords--;
          alert("Usunięto.");
        }
      });
    }
  }

  readJobOffers(event?: PaginatorState) {
    const page = event ? Math.floor(event.first / event.rows) : 0;
    const size = event ? event.rows : this.rows;
    const userId = Number(localStorage.getItem('companyId')) || null;

    this.companyService.readCompanyJobOffers(userId,page, size).subscribe(response => {
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
