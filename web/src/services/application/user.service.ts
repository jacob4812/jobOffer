import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  findUserByEmail(): Observable<any> {
    const email = localStorage.getItem('email');

    if (!email) {
      console.error('Email not found in localStorage');
      return throwError('Email not found in localStorage');
    }

    return this.http.get(`${this.apiUrl}/profile?email=${email}`).pipe(
      catchError(error => {
        console.error('Error fetching user data:', error);
        return throwError('Error fetching user data');
      })
    );
  }

  updateUserProfile(user: any): Observable<any> {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Token not found in localStorage');
      return throwError('Token not found in localStorage');
    }

    //console.log('Using token:', token);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put(`${this.apiUrl}/update`, user, { headers }).pipe(
      catchError(error => {
        console.error('Error updating user profile:', error);
        return throwError('Error updating user profile');
      })
    );
  }
}
