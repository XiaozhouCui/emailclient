import { Component, OnInit, Input } from '@angular/core';
import { Email } from '../email';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-reply',
  templateUrl: './email-reply.component.html',
  styleUrls: ['./email-reply.component.css'],
})
export class EmailReplyComponent {
  showModal = false;
  // receiving email from parent (email-show)
  @Input() email: Email;

  constructor(private emailService: EmailService) {}

  // ngOnInit() only run once
  // populate email-form with passed in email object from email-show
  ngOnChanges() {
    const text = this.email.text.replace(/\n/gi, '\n> ');
    // in reply, need to swap "To" and "From", before populating email-form
    this.email = {
      ...this.email,
      from: this.email.to,
      to: this.email.from,
      subject: `Re: ${this.email.subject}`,
      text: `\n\n\n-------- ${this.email.from} wrote: --------\n> ${text}`,
    };
  }

  onSubmit(email: Email) {
    this.emailService.sendEmail(email).subscribe(() => {
      this.showModal = false;
    });
  }
}
