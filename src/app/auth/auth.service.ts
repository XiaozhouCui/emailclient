import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

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

interface SignedinResponse {
  authenticated: boolean;
  username: string;
}

interface SigninCredentials {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  rootUrl = 'https://api.angular-email.com';

  // BehaviorSubject is both observable and observer, it can take in a default value (false) and emit new value immediately after new subscriber subscribes
  // adding an optional "$" sign to label it as an "observable"
  signedin$ = new BehaviorSubject(false); // not signed in by default (false)

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
    return this.http
      .post<SignupResponse>(`${this.rootUrl}/auth/signup`, credentials, {
        // by difault, httpClient will discard cookies in response, need to set withCredentials to "true"
        // withCredentials: true, // this is now handled by interceptor
      })
      .pipe(
        // if an error coming out of the observable, it will skip the tap() operator
        tap(() => {
          // make the signedin$ BehaviorSubject emit a new value "true"
          this.signedin$.next(true); // emit "true" to the subscriber (app.component) upon successful signup
        })
      );
  }

  checkAuth() {
    return this.http
      .get<SignedinResponse>(`${this.rootUrl}/auth/signedin`, {
        // withCredentials: true, // accept cookies in response
      })
      .pipe(
        tap(({ authenticated }) => {
          // response: {authenticated: true, username: "a5sd3f54sad"}
          this.signedin$.next(authenticated);
        })
      );
  }

  signout() {
    return this.http.post(`${this.rootUrl}/auth/signout`, {}).pipe(
      tap(() => {
        this.signedin$.next(false);
      })
    );
  }

  signin(credentials: SigninCredentials) {
    return this.http.post(`${this.rootUrl}/auth/signin`, credentials).pipe(
      tap(() => {
        // tap operator will only be executed when request is successful
        // make the signedin$ BehaviorSubject emit a new value "true"
        this.signedin$.next(true); // emit "true" to the subscriber (app.component) upon successful signin
      })
    );
  }
}
