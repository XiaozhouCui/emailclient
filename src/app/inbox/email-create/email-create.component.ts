import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Email } from '../email';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-create',
  templateUrl: './email-create.component.html',
  styleUrls: ['./email-create.component.css'],
})
export class EmailCreateComponent implements OnInit {
  showModal = false;
  email: Email;

  constructor(
    private authService: AuthService,
    private emailService: EmailService
  ) {
    this.email = {
      id: '',
      to: '',
      subject: '',
      html: '',
      text: '',
      from: `${authService.username}@angular-email.com`,
    };
  }

  ngOnInit(): void {}

  // receive the filled email from child component (email-form) as event argument
  onSubmit(email: Email) {
    // emailService.sendEmail will send post request and return an observable
    this.emailService.sendEmail(email).subscribe(() => {
      this.showModal = false;
    });
  }
}
