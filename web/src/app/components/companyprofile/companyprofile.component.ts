import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CompanyProfileDialogComponent } from '../companyprofile-dialog/companyprofile-dialog.component';
import { AddJobComponent } from '../add-job/add-job.component';
import { OfferService } from 'src/services/offers/offer.service';
import { CompanyService } from 'src/services/company/company.service';
import { Company } from 'src/app/models/company.model';

@Component({
  selector: 'companyprofile-component',
  templateUrl: './companyprofile.component.html',
  styleUrls: ['./companyprofile.component.scss']
})
export class CompanyProfileComponent implements OnInit {
  company: Company;
  message: string = '';

  constructor(public dialog: MatDialog,
    private offerService: OfferService,
    private companyService: CompanyService
  ) {}

  ngOnInit(): void {
   this.readCompanyData();
  }

  openEditDialog(): void {
    const dialogRef = this.dialog.open(CompanyProfileDialogComponent, {
      width: '300px',
      data: { company: { ...this.company } }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.company = result;
      }
    });
  }
  openJobDialog(): void {
    const dialogRef = this.dialog.open(AddJobComponent, {
      width: '400px',
      data: {
        company:this.company,
        title: '',
        location: '',
        contractType: '',
        salary: '',
        expirationDate: '',
        description: "Wakaty: 2 (Mid oraz Senior) Start: ASAP Forma współpracy: B2B z ITFS (outsourcing) Projekt: branża automatyki, energetyki oraz"
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
    console.log(userId);
    if (userId) {
      this.companyService.readCompanyData(userId).subscribe({
        next: (response: Company) => {
          this.company = response; 
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
}
