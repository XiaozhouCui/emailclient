import { Injectable } from '@angular/core';
import { AsyncValidator, FormControl } from '@angular/forms';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../auth.service';

// allow UniqueUsername class to use dependency injection system
@Injectable({ providedIn: 'root' })
export class UniqueUsername implements AsyncValidator {
  // inject authService instance
  constructor(private authService: AuthService) {}
  // use arrow function to bind "this" to current class
  validate = (control: FormControl) => {
    const { value } = control;
    return this.authService.usernameAvailable(value).pipe(
      map((value) => {
        // console.log(value); // { available: true }
        if (value.available) {
          return null;
        }
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
