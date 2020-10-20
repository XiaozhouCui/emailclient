import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Email } from './email';

interface EmailSummary {
  id: string;
  subject: string;
  from: string;
}

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  rootUrl = 'https://api.angular-email.com';

  constructor(private http: HttpClient) {}

  getEmails() {
    // return observable, which will emit an array of EmailSummary objects
    return this.http.get<EmailSummary[]>(`${this.rootUrl}/emails`, {
      // withCredentials: true, // handled by interceptor
    });
  }

  getEmail(id: string) {
    return this.http.get<Email>(`${this.rootUrl}/emails/${id}`);
  }
}