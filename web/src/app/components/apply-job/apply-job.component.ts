import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApplicationRequest } from 'src/app/models/applicationRequest.model';
import { JobOffer } from 'src/app/models/job-offer.model';
import { ApplicationService } from 'src/services/application/application.service';
import { CvServiceService } from 'src/services/cvService/cv-service.service';

@Component({
  selector: 'apply-job',
  templateUrl: './apply-job.component.html',
  styleUrls: ['./apply-job.component.scss']
})
export class ApplyJobComponent implements OnInit {
  applicationRequest: ApplicationRequest
  selectedFile: File | null = null;
  cvUploaded = false;
  cvTouched = false;
  cvFileName: string ;
  userHasCv = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ApplyJobComponent>,
    private applicationService:ApplicationService,
    private cvService:CvServiceService,
    private cdr: ChangeDetectorRef
  ) { }
  ngOnInit(): void {
     this.getCv();
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const validExtensions = ['pdf', 'doc', 'docx'];
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      this.cvUploaded = validExtensions.includes(fileExtension || '');
      this.cvTouched = true;
      this.selectedFile = file;
    }
  }

  onSubmit() {
    this.applyForJob();
    if (this.userHasCv && this.selectedFile) {
      this.updateCv();
    }else if (!this.userHasCv && this.selectedFile ) {
      this.uploadCv();
      this.dialogRef.close(); 
    }
   
  }
  applyForJob(){
     const userId = Number(localStorage.getItem("idUser"));
    this.applicationRequest = {
      userId: userId,
      offerId: this.data.id,
      companyId: this.data.company.id
    };
    
    this.applicationService.applyForJob(this.applicationRequest).subscribe({
      next: (response: any) => {
        alert("Application submitted successfully.");
      
        this.dialogRef.close(); 
      },
      error: (err) => {
        alert("Failed to submit application: " + err.message);
      }
    });
  }
  uploadCv() {
    if (this.selectedFile) {
      const userId = localStorage.getItem("idUser");
      if (userId) {
        this.cvService.uploadCv(this.selectedFile, userId).subscribe(
          () => {
            this.cvFileName = this.selectedFile!.name;
            this.cvUploaded = true;
            this.cdr.detectChanges();
          },
          (error) => console.error('Error uploading file:', error)
        );
      }
    }
  }
  getCv() {
    const userId = localStorage.getItem("idUser");
    if (userId) {
      this.cvService.getCv(userId).subscribe(
        (response) => {
          if (response) {
            this.cvFileName = response;
            this.cvUploaded = true;
            this.userHasCv = true;
          } else {
            this.cvFileName = '';
            this.cvUploaded = false;
            this.userHasCv = false;
          }
        },
        (error) => {
          if (error.status === 204) {
            this.cvFileName = '';
            this.cvUploaded = false;
            this.userHasCv = false;
            console.error('Error fetching CV:', error);
          } else if (error.status === 403) {
            console.log("No CV available.");
            this.cvFileName = '';
            this.cvUploaded = false;
            this.userHasCv = false;
          }
          else {

            console.log("No CV available.");
            this.cvUploaded = false;
            this.cvFileName = '';
            this.userHasCv = false;
          }
        }
      );
    } else {
      console.error('User ID is not available');
      this.cvUploaded = false;
      this.userHasCv = false;
      this.cvFileName = '';
    }
  }
  editCv() {
    const inputFile = document.createElement('input');
    inputFile.type = 'file';
    inputFile.accept = 'application/pdf';

    inputFile.onchange = (event: any) => {
      const newFile = event.target.files[0];
      if (newFile) {
        this.selectedFile = newFile;
        this.userHasCv = true;
        this.updateCv();
      }
    };

    inputFile.click();
  }
  updateCv() {
    if (this.selectedFile) {
      const userId = localStorage.getItem("idUser");
      if (userId) {
        this.cvService.updateCv(this.selectedFile, userId).subscribe(
          () => {
            this.cvFileName = this.selectedFile!.name;
            this.cvUploaded = true;
            this.userHasCv = true;
          },
          (error) => console.error('Error updating CV:', error)
        );
      } else {
        console.error('User ID is not available');
      }
    }
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
