import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}
  baseUrl = 'localhost:7700/api/v1/auth';

  signup(user: any) {
    return this.http.post('signup', user);
  }

  login(user: any): Observable<any>{
    return this.http.post(`${this.baseUrl}/login`, user);
  }

  logout(): Observable<any> {
    return this.http.post('/logout', {});
  }

  getCurrentUser() {
    return this.http.get('/api/me');
  }
}
