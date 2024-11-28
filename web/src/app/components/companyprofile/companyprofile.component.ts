import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CompanyProfileDialogComponent } from '../companyprofile-dialog/companyprofile-dialog.component';
import { AddJobComponent } from '../add-job/add-job.component';
import { OfferService } from 'src/services/offers/offer.service';

@Component({
  selector: 'companyprofile-component',
  templateUrl: './companyprofile.component.html',
  styleUrls: ['./companyprofile.component.scss']
})
export class CompanyProfileComponent implements OnInit {

  user: { companyname: string, nip: string };
  message: string = '';

  constructor(public dialog: MatDialog,
    private offerService: OfferService
  ) {
    this.user = {
      companyname: 'Test123',
      nip: '2137'
    };
  }

  ngOnInit(): void {
    // pobierz dane użytkownika
  }

  openEditDialog(): void {
    const dialogRef = this.dialog.open(CompanyProfileDialogComponent, {
      width: '300px',
      data: { user: { ...this.user } }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.user = result;
      }
    });
  }
  openJobDialog(): void {
    const dialogRef = this.dialog.open(AddJobComponent, {
      width: '400px',
      data: {
        company: { id: 1, 
          companyName: 'sds', 
          email: 'Kubax997@tlen.pl',
          userRole: 'COMPANY'}, // Pass company name dynamically
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
}
