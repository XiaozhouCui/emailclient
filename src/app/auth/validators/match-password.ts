import { Injectable } from '@angular/core';
import { FormGroup, Validator } from '@angular/forms';

// add this custom class to the dependency injection system
@Injectable({ providedIn: 'root' })
// implement "Validator" interface: check this class has all functions to implement validator correctly
export class MatchPassword implements Validator {
  validate(formGroup: FormGroup) {
    const { password, passwordConfirmation } = formGroup.value;

    if (password === passwordConfirmation) return null;
    return { passwordsDontMatch: true };
  }
}
