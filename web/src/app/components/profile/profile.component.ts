import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../../services/application/user.service';
import { ProfileDialogComponent } from '../profile-dialog/profile-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'profile-component',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: { id: number, username: string, email: string, phoneNumber: string | null, userRole: string };

  constructor(public dialog: MatDialog, private userService: UserService) {
    this.user = {
      id: 0,
      username: '',
      email: '',
      phoneNumber: null,
      userRole: ''
    };
  }

  ngOnInit(): void {
    this.pobierzDaneUzytkownika();
  }

  pobierzDaneUzytkownika() {
    this.userService.findUserByEmail().subscribe(
      (data: any) => {
        this.user.id = data.id;
        this.user.username = data.login;
        this.user.email = data.email;
        this.user.phoneNumber = data.phoneNumber;
        this.user.userRole = data.userRole;
      },
      (error: HttpErrorResponse) => {
        console.error('Failed to fetch user data:', error);
      }
    );
  }

  openEditDialog(): void {
    const dialogRef = this.dialog.open(ProfileDialogComponent, {
      width: '300px',
      data: { user: { ...this.user } }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.user = result;
        this.userService.updateUserProfile(this.user).subscribe(
          () => console.log('User profile updated successfully'),
          (error: HttpErrorResponse) => {
            console.error('Failed to update user profile:', error);
          }
        );
      }
    });
  }
}
