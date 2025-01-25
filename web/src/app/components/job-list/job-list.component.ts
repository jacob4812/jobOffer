import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JobDetailDialogComponent } from '../job-detail-dialog/job-detail-dialog.component';
import { OfferService } from "../../../services/offers/offer.service";
import { PaginatorState } from "primeng/paginator";
import { JobOffer } from "../../models/job-offer.model";
import { Page } from "../../models/page.model";
import { ApplyJobComponent } from '../apply-job/apply-job.component';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styles: []
})
export class JobListComponent implements OnInit {
  jobOffers: JobOffer[] = [];
  first = 0;
  rows = 10;
  totalRecords = 0;
  totalPages = 0;
  role: string = '';

  ngOnInit() {
    this.readJobOffers();
    this.role = localStorage.getItem('role') || '';
  }

  constructor(public dialog: MatDialog, private offerService: OfferService) { }

  openJobDetailDialog(offer: JobOffer) {
    this.dialog.open(JobDetailDialogComponent, {
      data: offer
    });
    console.log(offer.company);
  }
  openApplyJobComponent(offer: JobOffer) {
    this.dialog.open(ApplyJobComponent, {
      data: offer
    });
    console.log(offer.id);
    console.log(offer.company.id)

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
