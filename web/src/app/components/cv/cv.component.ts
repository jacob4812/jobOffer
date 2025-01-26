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
  cvFileName: string ; // Przechowuje dane pliku po dodaniu
  cv: any;
  constructor(private http: HttpClient) {}

  // Funkcja wywoływana przy załadowaniu komponentu
  ngOnInit(): void {
    this.getCv(); // Sprawdzenie, czy CV jest już w bazie
  }

  // Funkcja do pobrania CV z serwera
  getCv() {
    const userId = localStorage.getItem("idUser");
    if (userId) {
      this.http.get('http://localhost:8080/api/cv/' + userId, { responseType: 'text' }).subscribe(
        (response: string) => {
          if (response) {
            this.cvFileName = response; // Ustawienie nazwy pliku
            this.cvUploaded = true; // CV jest załadowane
            console.log("CV file name:", this.cvFileName); // Wyświetlenie nazwy pliku w konsoli
          } else {
            this.cvFileName = ''; // Brak CV w bazie
            this.cvUploaded = false; // CV nie jest załadowane
            console.log("No CV found for this user.");
          }
        },
        (error) => {
          if (error.status === 204) {
            // Jeśli serwer zwrócił 204 (brak zawartości), zaktualizuj stan
            this.cvFileName = ''; // Brak CV
            this.cvUploaded = false;
            console.error('Error fetching CV:', error);
          } else if (error.status === 403) {
            console.log("No CV available.");
            this.cvFileName = ''; // Resetowanie nazwy pliku
            this.cvUploaded = false;
          }
          else {
            // Obsługa innych błędów, np. 404 lub 500
            console.log("No CV available.");
            this.cvUploaded = false;
            this.cvFileName = ''; // Resetowanie nazwy pliku
          }
        }
      );
    } else {
      console.error('User ID is not available');
      this.cvUploaded = false;
      this.cvFileName = ''; // Resetowanie nazwy pliku, gdy nie ma ID użytkownika
    }
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
      const userId = localStorage.getItem("idUser");
      formData.append('userId', userId);
      // Wysłanie pliku na serwer
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
    const userId = localStorage.getItem("idUser");
  if (userId) {
    this.http.delete(`http://localhost:8080/api/cv/delete/${userId}`).subscribe(
      (response: any) => {
        console.log('CV deleted successfully');
        this.cvUploaded = false; // Zaktualizuj stan, np. oznaczenie, że CV zostało usunięte
      },
      (error) => {
        console.error('Error deleting CV:', error);
      }
    );
  } else {
    console.error('User ID is not available');
  }
  }

  // Funkcja do podglądu CV (np. otwarcie pliku w nowej karcie)
  viewCV(id: string) {
    window.open(`http://localhost:8080/api/cv/${id}`, '_blank');
  }
}
