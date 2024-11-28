import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DashboardJobDetailDialogComponent } from '../job-detail-dialog-dashboard/job-detail-dialog-dashboard.component';
import { OfferService } from "../../../services/offers/offer.service";
import { PaginatorState } from "primeng/paginator";
import { JobOffer } from "../../models/job-offer.model";
import { Page } from "../../models/page.model";


@Component({
  selector: 'app-job-list-dashboard',
  templateUrl: './job-list-dashboard.component.html',
  styles: []
})
export class DashboardJobListComponent implements OnInit {
  jobOffers: JobOffer[] = [];
  first = 0;
  rows = 10;
  totalRecords = 0;
  totalPages = 0;
  expandedDescriptions: Set<number> = new Set();


  ngOnInit() {
     this.readJobOffers();
  }

  constructor(public dialog: MatDialog, private offerService: OfferService) { }


  isTextTruncated(offer: JobOffer): boolean {
    return !this.expandedDescriptions.has(offer.id);
  }


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
    console.log(offer.company);
  }
  readJobOffers(event?: PaginatorState) {
    const page = event ? Math.floor(event.first / event.rows) : 0;
    const size = event ? event.rows : this.rows;

    this.offerService.readAllJobOffers(page, size).subscribe((response: Page<JobOffer>) => {
      this.jobOffers = response.content;
      this.totalRecords = response.totalElements;
      this.totalPages = response.totalPages;

      if (page >= this.totalPages && this.totalPages > 0) {
        this.first = (this.totalPages - 1) * this.rows;
        this.readJobOffers({ first: this.first, rows: this.rows });
      }
    });
  }

  onPageChange(event: PaginatorState) {
    const requestedPage = Math.floor(event.first / event.rows);
    if (requestedPage >= 0 && requestedPage < this.totalPages) {
      this.readJobOffers(event);
    } else {
      this.first = (this.totalPages - 1) * this.rows;
      this.readJobOffers({ first: this.first, rows: this.rows });
    }
  }

}
