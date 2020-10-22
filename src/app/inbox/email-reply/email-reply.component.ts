import { Component, OnInit } from '@angular/core';
import { Email } from '../email';

@Component({
  selector: 'app-email-reply',
  templateUrl: './email-reply.component.html',
  styleUrls: ['./email-reply.component.css'],
})
export class EmailReplyComponent implements OnInit {
  showModal = false;
  email: Email;

  constructor() {}

  ngOnInit(): void {}

  onSubmit(email: Email) {}
}
