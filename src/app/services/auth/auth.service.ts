import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'https://localhost:44341/api/accounts';

  constructor(private http: HttpClient) { }

  registerUser(signUpForm: { name: string, email: string, password: string }): any {
    return this.http.post(`${this.url}/register`, signUpForm)
      .pipe(map(response => {
        return this.handleResult(response);
      }));
  }

  loginUser(loginForm: { email: string, password: string }): any {
    return this.http.post(`${this.url}/login`, loginForm)
      .pipe(map(response => {
        return this.handleResult(response);
      }));
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }

    const helper = new JwtHelperService();
    const isExpired = helper.isTokenExpired(token);

    if (isExpired) { return false; }
    return true;
  }

  getToken(): string {
    const token = localStorage.getItem('token');

    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);

    return decodedToken;
  }

  private handleResult(response: any): boolean {
    if ('token' in response) {
      const result: SuccessfulResponse = response;
      localStorage.setItem('token', result.token);
      return true;
    }
    return false;
  }
}

interface SuccessfulResponse {
  token: string;
}
