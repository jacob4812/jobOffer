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
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ApplyJobComponent>,
    private applicationService:ApplicationService
  ) { }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      // this.data.cv = file;
    }
  }

  onSubmit() {
    this.applyForJob();
    this.dialogRef.close(this.data);
  }
  applyForJob(){

    this.applicationRequest = {
      userId: this.data.company.id,
      offerId: this.data.id
    };
      console.log(this.data.id)
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

}
