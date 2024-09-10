import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProfileDialogComponent } from '../profile-dialog/profile-dialog.component';

@Component({
  selector: 'profile-component',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: { username: string, email: string, fullName: string, phoneNumber: string };

  constructor(public dialog: MatDialog) {
    this.user = {
      username: 'Janek123',
      email: 'jannowak@gmail.com',
      fullName: 'Jan Nowak',
      phoneNumber: '123 456 789'
    };
  }

  ngOnInit(): void {
    // pobierz dane użytkownika
  }

  openEditDialog(): void {
    const dialogRef = this.dialog.open(ProfileDialogComponent, {
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
