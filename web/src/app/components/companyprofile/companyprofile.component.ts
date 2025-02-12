import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CompanyProfileDialogComponent } from '../companyprofile-dialog/companyprofile-dialog.component';
import { AddJobComponent } from '../add-job/add-job.component';
import { OfferService } from 'src/services/offers/offer.service';
import { CompanyService } from 'src/services/company/company.service';
import { Company } from 'src/app/models/company.model';
import { Observable } from 'rxjs';
import { CompanyDataUpdate } from 'src/app/dto/model/company/company-data-update';
import { Experience } from 'src/app/models/experience';

@Component({
  selector: 'companyprofile-component',
  templateUrl: './companyprofile.component.html',
  styleUrls: ['./companyprofile.component.scss']
})
export class CompanyProfileComponent implements OnInit {
  company: Company;
  message: string = '';
  constructor(
    public dialog: MatDialog,
    private offerService: OfferService,
    private companyService: CompanyService
  ) {

  }

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
      }
    });
  }
  openJobDialog(): void {
    const dialogRef = this.dialog.open(AddJobComponent, {
      width: '90%',
      height: '75%',
      data: {
        company:this.company,
        title: '',
        location: '',
        contractType: '',
        salary: '',
        expirationDate: '',
        description: "",
        offerExperience: [] as Experience[]
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
    const userId = Number(localStorage.getItem('companyId')) || null;
    const email = localStorage.getItem('email') || null;
    if (userId) {
      this.companyService.readCompanyData(userId).subscribe({
        next: (response: Company) => {
          this.company = response;
          this.company.email = email;
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
