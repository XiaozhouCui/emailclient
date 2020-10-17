import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatchPassword } from '../validators/match-password';
import { UniqueUsername } from '../validators/unique-username';
import { AuthService } from './../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  authForm = new FormGroup(
    {
      // 1st arg is the default value
      // 2nd arg array contains sync validators
      // 3rd arg array contains async validators (only run when sync validators all pass)
      username: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(/^[a-z0-9]+$/),
        ],
        [this.uniqueUsername.validate]
      ),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
      passwordConfirmation: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
    },
    // add validators for the entire authForm as a whole
    { validators: [this.matchPassword.validate] }
  );
  // dependency injection: MatchPassword
  constructor(
    private matchPassword: MatchPassword,
    private uniqueUsername: UniqueUsername,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.authForm.invalid) return;
    // console.log(this.authForm.value); // signup credentials

    // signup() will return an observable, need to chain .subscribe()
    this.authService.signup(this.authForm.value).subscribe({
      // next(response) {
      next: (response) => {
        // console.log(this); // if not binded, "this" will point to the subscribe method's argument object
      },
      error: (err) => {
        if (!err.status) {
          this.authForm.setErrors({ noConnection: true });
        } else {
          this.authForm.setErrors({ unknownError: true });
        }
      },
    });
  }
}
