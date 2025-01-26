import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CvUpload } from 'src/app/models/cvUpload.model';


@Component({
  selector: 'cv-component',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss']
})
export class CvComponent implements OnInit { 
  selectedFile: File | null = null; 
  cvUploaded = false; 
  cvFileName: string ; 
  cv: any;
  constructor(private http: HttpClient) {}

 
  ngOnInit(): void {
    this.getCv(); 
  }

  
  getCv() {
    const userId = localStorage.getItem("idUser");
    if (userId) {
      this.http.get('http://localhost:8080/api/cv/' + userId, { responseType: 'text' }).subscribe(
        (response: string) => {
          if (response) {
            this.cvFileName = response; 
            this.cvUploaded = true; 
            console.log("CV file name:", this.cvFileName); 
          } else {
            this.cvFileName = ''; 
            this.cvUploaded = false; 
            console.log("No CV found for this user.");
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
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      const userId = localStorage.getItem("idUser");
      formData.append('userId', userId);
      
      const url = `http://localhost:8080/api/cv/upload/${userId}`;
      this.http.post(url, formData).subscribe(
        (response: any) => {
          this.cv = response;
          this.cvUploaded = true;
        },
        (error) => {
          console.error('Error uploading file:', error);
        }
      );
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
        this.uploadCv();
      }
    };

    inputFile.click(); 
  }

  
  deleteCv() {
    const userId = localStorage.getItem("idUser");
  if (userId) {
    this.http.delete(`http://localhost:8080/api/cv/delete/${userId}`).subscribe(
      (response: any) => {
        console.log('CV deleted successfully');
        this.cvUploaded = false; 
      },
      (error) => {
        console.error('Error deleting CV:', error);
      }
    );
  } else {
    console.error('User ID is not available');
  }
  }

  
  viewCV(id: string) {
    window.open(`http://localhost:8080/api/cv/${id}`, '_blank');
  }
}
