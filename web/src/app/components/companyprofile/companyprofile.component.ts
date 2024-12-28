import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CompanyProfileDialogComponent } from '../companyprofile-dialog/companyprofile-dialog.component';
import { AddJobComponent } from '../add-job/add-job.component';
import { OfferService } from 'src/services/offers/offer.service';
import { CompanyService } from 'src/services/company/company.service';
import { Company } from 'src/app/models/company.model';
import { JobOffer } from 'src/app/models/job-offer.model';

@Component({
  selector: 'companyprofile-component',
  templateUrl: './companyprofile.component.html',
  styleUrls: ['./companyprofile.component.scss']
})
export class CompanyProfileComponent implements OnInit {
  company: Company;
  message: string = '';
  jobOffers: JobOffer[] = [];

  constructor(
    public dialog: MatDialog,
    private offerService: OfferService,
    private companyService: CompanyService
  ) {}

  ngOnInit(): void {
    this.readCompanyData();
  }

  openEditDialog(): void {
    const dialogRef = this.dialog.open(CompanyProfileDialogComponent, {
      width: '400px',
      data: { company: { ...this.company } }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.company = result;
        this.updateCompanyProfile(this.company);
      }
    });
  }

  updateCompanyProfile(company: any): void {
    this.companyService.updateCompanyProfile(company).subscribe({
      next: () => console.log('Company profile updated successfully'),
      error: (err) => console.error('Failed to update company profile:', err)
    });
  }

  openJobDialog(): void {
    const dialogRef = this.dialog.open(AddJobComponent, {
      width: '400px',
      data: {
        company: this.company,
        title: '',
        location: '',
        contractType: '',
        salary: '',
        expirationDate: '',
        description: ""
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.offerService.addJobOffer(result).subscribe({
          next: () => {
            this.message = 'Job offer added successfully!';
          },
          error: () => {
            this.message = 'Failed to add job offer. Please try again.';
          }
        });
      }
    });
  }

  readCompanyData(): void {
    const userId = Number(localStorage.getItem('idUser')) || null;
    console.log('User ID:', userId);

    if (userId) {
      this.companyService.readCompanyData(userId).subscribe({
        next: (response: Company) => {
          this.company = response;
          const email = localStorage.getItem('email');
          if (email) {
            this.company.email = email;
          }

          this.readCompanyJobOffers(userId);
        },
        error: () => {
          console.error('Failed to fetch company data');
          this.company = null;
        }
      });
    } else {
      console.error('User ID not found in localStorage');
      this.company = null;
    }
  }

  readCompanyJobOffers(userId: number): void {
    const page = 0;
    const size = 10;

    this.companyService.readCompanyJobOffers(userId, page, size).subscribe({
      next: (offers) => {
        this.jobOffers = offers.content;
        console.log('Fetched job offers:', this.jobOffers);
      },
      error: () => {
        console.error('Failed to fetch job offers');
      }
    });
  }
}
