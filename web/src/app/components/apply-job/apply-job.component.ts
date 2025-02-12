import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApplicationRequest } from 'src/app/models/applicationRequest.model';
import { JobOffer } from 'src/app/models/job-offer.model';
import { ApplicationService } from 'src/services/application/application.service';

@Component({
  selector: 'apply-job',
  templateUrl: './apply-job.component.html',
  styleUrls: ['./apply-job.component.scss']
})
export class ApplyJobComponent {
  applicationRequest: ApplicationRequest
  cvUploaded = false;
  cvTouched = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ApplyJobComponent>,
    private applicationService:ApplicationService
  ) { }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const validExtensions = ['pdf', 'doc', 'docx'];
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      this.cvUploaded = validExtensions.includes(fileExtension || '');
      this.cvTouched = true;
    }
  }

  onSubmit() {
    this.applyForJob();
    this.dialogRef.close(this.data);
  }
  applyForJob(){
     const userId = Number(localStorage.getItem("idUser"));
    this.applicationRequest = {
      userId: userId,
      offerId: this.data.id,
      companyId: this.data.company.id
    };
      console.log("offer "+this.data.id)
      console.log("company "+this.data.company.id)
      console.log("userid "+ userId)
    // Send the application request to the backend
    this.applicationService.applyForJob(this.applicationRequest).subscribe({
      next: (response: any) => {
        alert("Application submitted successfully.");
        this.dialogRef.close(); // Close the dialog on success
      },
      error: (err) => {
        alert("Failed to submit application: " + err.message);
      }
    });
  }
  

  isFutureBirthDate(): boolean {
    return this.data.birthDate && new Date(this.data.birthDate) > new Date();
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
