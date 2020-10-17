import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AsyncValidator, FormControl } from '@angular/forms';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

// allow UniqueUsername class to use dependency injection system
@Injectable({ providedIn: 'root' })
export class UniqueUsername implements AsyncValidator {
  // injected http instance
  constructor(private http: HttpClient) {}
  // use arrow function to bind "this" to current class
  validate = (control: FormControl) => {
    const { value } = control;
    // generic annotation <any>: getting any type of response from request
    return this.http
      .post<any>('https://api.angular-email.com/auth/username', {
        username: value,
      })
      .pipe(
        map((value) => {
          // console.log(value); // { available: true }
          // if (value.available) // not needed, only 200 response will come here
          return null;
        }),
        // non 200 response will come here
        catchError((err) => {
          // console.log(err); // HttpErrorResponse object
          if (err.error.username) {
            // "of" operator returns an observable, it will take in an object and emit it.
            return of({ nonUniqueUsername: true });
          } else {
            return of({ noConnection: true });
          }
        })
      );
  };
}
