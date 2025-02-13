import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef,Component, OnInit } from '@angular/core';
import { CvServiceService } from 'src/services/cvService/cv-service.service';


@Component({
  selector: 'cv-component',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss']
})
export class CvComponent implements OnInit {
  selectedFile: File | null = null;
  cvUploaded = false;
  cvFileName: string ;
 
  constructor(private cvService:CvServiceService,private cdr: ChangeDetectorRef) {}


  ngOnInit(): void {
    this.getCv();
  }


  getCv() {
    const userId = localStorage.getItem("idUser");
    if (userId) {
      this.cvService.getCv(userId).subscribe(
        (response) => {
          if (response) {
            this.cvFileName = response;
            this.cvUploaded = true;
          } else {
            this.cvFileName = '';
            this.cvUploaded = false;
          }
        },
        (error) => {
          if (error.status === 204) {
            this.cvFileName = '';
            this.cvUploaded = false;
            console.error('Error fetching CV:', error);
          } else if (error.status === 403) {
            console.log("No CV available.");
            this.cvFileName = '';
            this.cvUploaded = false;
          }
          else {

            console.log("No CV available.");
            this.cvUploaded = false;
            this.cvFileName = '';
          }
        }
      );
    } else {
      console.error('User ID is not available');
      this.cvUploaded = false;
      this.cvFileName = '';
    }
  }


  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.cvUploaded = false;
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


  editCv() {
    const inputFile = document.createElement('input');
    inputFile.type = 'file';
    inputFile.accept = 'application/pdf';

    inputFile.onchange = (event: any) => {
      const newFile = event.target.files[0];
      if (newFile) {
        this.selectedFile = newFile;
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
          },
          (error) => console.error('Error updating CV:', error)
        );
      } else {
        console.error('User ID is not available');
      }
    }
  }

  deleteCv() {
    const userId = localStorage.getItem("idUser");
    if (userId) {
      this.cvService.deleteCv(userId).subscribe(
        () => {
          this.cvUploaded = false;
          this.selectedFile = null;
        },
        (error) => console.error('Error deleting CV:', error)
      );
    } else {
      console.error('User ID is not available');
    }
  }


  viewCv() {
    const userId = localStorage.getItem("idUser");
    if (userId) {
      this.cvService.viewCv(userId);
    } else {
      console.error('User ID is not available');
    }
  }
}
