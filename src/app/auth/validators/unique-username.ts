import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AsyncValidator, FormControl } from '@angular/forms';

// allow UniqueUsername class to use dependency injection system
@Injectable({ providedIn: 'root' })
export class UniqueUsername implements AsyncValidator {
  // injected http instance
  constructor(private http: HttpClient) {}
  // use arrow function to bind "this" to current class
  validate = (control: FormControl) => {
    const { value } = control;
    console.log(this.http);
    return null;
  };
}
