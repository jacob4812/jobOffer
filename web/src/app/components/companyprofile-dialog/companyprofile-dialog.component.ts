import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserRole } from 'src/app/dto/model/user/user/user-role';
import { CompanyService } from 'src/services/company/company.service';

@Component({
  selector: 'app-company-profile-dialog',
  templateUrl: './companyprofile-dialog.component.html',
  styleUrls: ['./companyprofile-dialog.component.scss']
})
export class CompanyProfileDialogComponent {

  constructor(
    private companyService: CompanyService,
    public dialogRef: MatDialogRef<CompanyProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { company: { id: number;
      companyName: string;
      phoneNumber:number;
      nip:number;
      email:string;
      userRole: UserRole.COMPANY; } }
  ) {dialogRef.disableClose = true; }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.companyService.updateCompanyData(this.data.company).subscribe(() => {
      this.dialogRef.close(this.data.company);
      
    }, (error) => {
      console.error('Error updating company data:', error);
  });
}
validateNumberInput(event: KeyboardEvent, maxLength: number): void {
  const input = event.target as HTMLInputElement;
  
  
  if (!/^\d$/.test(event.key)) {
    event.preventDefault();
  }

  
  if (input.value.length >= maxLength) {
    event.preventDefault();
  }
}
}
