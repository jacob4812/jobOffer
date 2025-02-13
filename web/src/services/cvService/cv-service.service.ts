import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CvServiceService {
  private baseUrl = 'http://localhost:8080/api/cv';

  constructor(private http: HttpClient) { }

  getCv(userId: string): Observable<string> {
    return this.http.get(`${this.baseUrl}/${userId}`, { responseType: 'text' });
  }
  uploadCv(file: File, userId: string): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', userId);
    return this.http.post(`${this.baseUrl}/upload/${userId}`, formData, { responseType: 'text' });
  }

  updateCv(file: File, userId: string): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.put(`${this.baseUrl}/edit/${userId}`, formData, { responseType: 'text' });
  }

  deleteCv(userId: string): Observable<string> {
    return this.http.delete(`${this.baseUrl}/delete/${userId}`, { responseType: 'text' });
  }

  viewCv(userId: string): void {
    window.open(`${this.baseUrl}/${userId}`, '_blank');
  }
}
