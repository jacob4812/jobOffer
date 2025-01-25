import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserRole } from 'src/app/dto/model/user/user/user-role';
import { UserService } from 'src/services/user/user.service';

@Component({
  selector: 'profile-dialog',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./profile-dialog.component.scss']
})
export class ProfileDialogComponent {

  constructor(
    private userService: UserService,
    public dialogRef: MatDialogRef<ProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: { 
      id: number;
      login: string;
      phoneNumber:number;
      imie:string;
      nazwisko:string;
      userRole: UserRole; } }
  ) { dialogRef.disableClose = true;}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.userService.updateUserData(this.data.user).subscribe(() => {
      this.dialogRef.close(this.data.user);
      
    }, (error) => {
      console.error('Error updating company data:', error);
  });
  }
}
