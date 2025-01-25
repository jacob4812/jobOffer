import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProfileDialogComponent } from '../profile-dialog/profile-dialog.component';
import { UserService } from 'src/services/user/user.service';
import { User } from 'src/app/dto/model/user/user/user.model';

@Component({
  selector: 'profile-component',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: { username: string, email: string, imie: string, nazwisko:string, phoneNumber: string };
  userData: User;
  constructor(public dialog: MatDialog,private userService: UserService) {
    this.user = {
      username: null,
      email: null,
      imie: null,
      nazwisko: null,
      phoneNumber: null
    };
  }

  ngOnInit(): void {
    this.readUserData();
   }

  openEditDialog(): void {
    const dialogRef = this.dialog.open(ProfileDialogComponent, {
      width: '300px',
      data: { user: { ...this.userData } }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.user = result;
      }
    });
  }
  
  readUserData(): void {
    const userId = Number(localStorage.getItem('idUser')) || null;
    const email = localStorage.getItem('email') || null;
    if (userId) {
      this.userService.readUserData(userId).subscribe({
        next: (response: User) => {
          this.userData = response;
          this.user.email = email;
        },
        error: () => {
          console.error('Failed to fetch company data');
          this.userData = null;
        }
      });
    } else {
      console.error('User ID not found in localStorage');
      this.userData = null;
    }
  }
}
