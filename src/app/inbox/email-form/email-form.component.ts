import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Email } from '../email';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css'],
})
export class EmailFormComponent implements OnInit {
  emailForm: FormGroup;

  // passing down a fake email object from email-create
  @Input() email: Email;

  // Emit an "EemailSubmit" event as output
  @Output() emailSubmit = new EventEmitter();

  constructor() {}

  // passing down email from email-create to initialise inputs with starting default value
  ngOnInit(): void {
    const { subject, from, to, text } = this.email;

    this.emailForm = new FormGroup({
      to: new FormControl(to, [Validators.required, Validators.email]),
      from: new FormControl({ value: from, disabled: true }), // this disabled field will be dropped from emailForm.value
      subject: new FormControl(subject, [Validators.required]),
      text: new FormControl(text, [Validators.required]),
    });
  }

  onSubmit() {
    if (this.emailForm.invalid) return;

    // console.log(this.emailForm.value); // this will drop disabled value (emailForm.get('from'))
    // console.log(this.emailForm.getRawValue()); // this will include all values

    this.emailSubmit.emit(this.emailForm.value); // pass form values into "emailSubmit" event to be captured by email-create
  }
}
