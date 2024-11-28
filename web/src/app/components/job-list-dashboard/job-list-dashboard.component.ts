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
//     // dla testu
//     this.jobOffers = [
//       {
//         id: 1,
//         company: 'Intent',
//         title: 'Senior UI Motion Designer',
//         location: 'Warszawa',
//         contractType: 'B2B',
//         salary: '15 000 - 22 000 PLN',
//         timeAgo: '3 dni temu',
//         description: 'intent specializes in building and scaling products at the intersection of physical and digital. We excel at developing software for hardware, or for any situation where a digital interface facilitates communication with the physical world.',
//         experience: 'Senior',
//         technologies: 'UX/UI',
//       },
//       {
//         id: 2,
//         company: 'Neontri',
//         title: 'Tech Lead Fullstack Dev (Java/Angular)',
//         location: 'Wrocław',
//         contractType: 'B2B',
//         salary: '22 000 - 30 000 PLN',
//         timeAgo: '2 tygodnie temu',
//         description: "Z tej strony Neontri - jesteśmy firmą liczącą ponad 120 osób. Specjalizujemy się w dwóch obszarach: -tworzymy systemy, które zlecają nam nasi Klienci (najczęściej tworzymy coś od zera, albo dodajemy w pełni nowe funkcjonalności) głównie z obszaru: finansowego, bankowego, fin-tech, e-commerce - choć nie tylko :) -wspieramy naszych Klientów w rekrutacji Specjalistów, a naszym Kandydatom staramy się dobrać jak najlepiej dopasowane oferty (tzw. bodyleasing)",
//         experience: 'C-level',
//         technologies: 'Java, Spring, Angular',
//       },
//       {
//         id: 3,
//         company: 'XPERI Poland',
//         title: 'XPERI Poland Senior C++ Developer',
//         location: 'Warszawa',
//         contractType: 'B2B, Permanent',
//         salary: '-',
//         timeAgo: '2 dni temu',
//         description: 'Xperi invents, develops and delivers technologies that create extraordinary experiences at home and on the go for millions of people around the world through our consumer brands: DTS®, HD Radio™, and TiVo®.',
//         experience: 'Senior',
//         technologies: 'C++, Linux',
//       },
//       {
//         id: 4,
//         company: 'XPERI Poland',
//         title: 'Python Developer',
//         location: 'Kraków',
//         contractType: 'B2B',
//         salary: '-',
//         timeAgo: '12 godzin temu',
//         description: 'For our Client (banking industry) we are looking for experienced Integration/Python Developer.',
//         experience: 'Senior',
//         technologies: 'Python, SQL, API',
//       }
//     ];
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
