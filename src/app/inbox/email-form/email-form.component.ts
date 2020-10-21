import { Component, OnInit, Input } from '@angular/core';
import { Email } from '../email';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css'],
})
export class EmailFormComponent implements OnInit {
  emailForm: FormGroup;

  // passing down a fake email object from email-create
  @Input() email: Email;

  constructor() {}

  // passing down email from email-create to initialise inputs with starting default value
  ngOnInit(): void {
    const { subject, from, to, text } = this.email;

    this.emailForm = new FormGroup({
      to: new FormControl(to),
      from: new FormControl(from),
      subject: new FormControl(subject),
      text: new FormControl(text),
    });
  }
}
