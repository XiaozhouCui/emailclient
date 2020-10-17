import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface UsernameAvailableResponse {
  available: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  // this function will return an observable
  usernameAvailable(username: string) {
    // generic annotation <any>: getting any type of response from request
    // return this.http.post<any>('https://api.angular-email.com/auth/username', {
    return this.http.post<UsernameAvailableResponse>(
      'https://api.angular-email.com/auth/username',
      {
        username,
      }
    );
  }
}
