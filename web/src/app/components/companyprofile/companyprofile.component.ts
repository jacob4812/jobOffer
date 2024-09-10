import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CompanyProfileDialogComponent } from '../companyprofile-dialog/companyprofile-dialog.component';

@Component({
  selector: 'companyprofile-component',
  templateUrl: './companyprofile.component.html',
  styleUrls: ['./companyprofile.component.scss']
})
export class CompanyProfileComponent implements OnInit {

  user: { companyname: string, nip: string };

  constructor(public dialog: MatDialog) {
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
}
