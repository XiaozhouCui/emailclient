import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface UsernameAvailableResponse {
  available: boolean;
}

interface SignupCredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}

interface SignupResponse {
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  rootUrl = 'https://api.angular-email.com';

  // this function will return an observable
  usernameAvailable(username: string) {
    // generic annotation <any>: getting any type of response from request
    // return this.http.post<any>('https://api.angular-email.com/auth/username', {
    return this.http.post<UsernameAvailableResponse>(
      `${this.rootUrl}/auth/username`,
      {
        username,
      }
    );
  }

  // receive values from signup form
  signup(credentials: SignupCredentials) {
    return this.http.post<SignupResponse>(
      `${this.rootUrl}/auth/signup`,
      credentials
    );
  }
}
