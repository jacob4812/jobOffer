import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CvUpload } from 'src/app/models/cvUpload.model';


@Component({
  selector: 'cv-component',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss']
})
export class CvComponent implements OnInit { 
  selectedFile: File | null = null; // Przechowuje wybrany plik
  cvUploaded = false; // Sprawdza, czy plik jest już przesłany
  cv: CvUpload = null; // Przechowuje dane pliku po dodaniu

  constructor(private http: HttpClient) {}

  // Funkcja wywoływana przy załadowaniu komponentu
  ngOnInit(): void {
    this.getCv(); // Sprawdzenie, czy CV jest już w bazie
  }

  // Funkcja do pobrania CV z serwera
  getCv() {
    this.http.get('http://localhost:8080/api/cv/7c612588-23aa-42a8-be6a-94363860e1b9').subscribe(
      (response: any) => {
        this.cv.fileName = response;
        this.cvUploaded = true;
        console.log(this.cvUploaded) // Jeśli CV jest w bazie, ustawiamy, że jest załadowane
      },
      (error) => {
        console.error('Error fetching CV:', error);
        console.log(this.cv)
      }
    );
  }

  // Funkcja do obsługi zmiany pliku
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.cvUploaded = false; // Zresetowanie flagi, aby umożliwić ponowne przesłanie
  }

  // Funkcja do przesyłania pliku
  uploadCv() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      // Wysłanie pliku na serwer
      this.http.post('http://localhost:8080/api/cv/upload', formData).subscribe(
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

  // Funkcja do edytowania pliku (zastępuje istniejący)
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

    inputFile.click(); // Otwarcie okna do wyboru pliku
  }

  // Funkcja do usuwania pliku
  deleteCv() {
    if (this.cv && this.cv.UUID) {
      this.http.delete(`http://localhost:8080/api/cv/${this.cv.UUID}`).subscribe(
        () => {
          this.cvUploaded = false;
          this.cv = null; // Zresetowanie danych CV
        },
        (error) => {
          console.error('Error deleting file:', error);
        }
      );
    }
  }

  // Funkcja do podglądu CV (np. otwarcie pliku w nowej karcie)
  viewCV(id: string) {
    window.open(`http://localhost:8080/api/cv/${id}`, '_blank');
  }
}
