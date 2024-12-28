import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private companyUrl = 'http://localhost:8080/api/company';
  constructor(private http: HttpClient) {}

  findCompanyByEmail(): Observable<any> {
    const email = localStorage.getItem('email');

    if (!email) {
      console.error('Email not found in localStorage');
      return throwError('Email not found in localStorage');
    }

    return this.http.get(`${this.companyUrl}/profile?email=${email}`).pipe(
      catchError(error => {
        console.error('Error fetching company data:', error);
        return throwError('Error fetching company data');
      })
    );
  }

  updateCompanyProfile(company: any): Observable<any> {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Token not found in localStorage');
      return throwError('Token not found in localStorage');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put(`${this.companyUrl}/update`, company, { headers }).pipe(
      catchError(error => {
        console.error('Error updating company profile:', error);
        return throwError('Error updating company profile');
      })
    );
  }

  readCompanyData(userId: number): Observable<any> {
    return this.http.get(`${this.companyUrl}/readCompanyData/${userId}`).pipe(
      catchError(error => {
        console.error('Error fetching company data:', error);
        return throwError('Error fetching company data');
      })
    );
  }

  readCompanyJobOffers(userId: number, page: number = 0, size: number = 10): Observable<any> {
    const url = `${this.companyUrl}/readCompanyJobOffers/${userId}?page=${page}&size=${size}`;
    return this.http.get(url).pipe(
      catchError(error => {
        console.error('Error fetching job offers:', error);
        return throwError('Error fetching job offers');
      })
    );
  }
}
