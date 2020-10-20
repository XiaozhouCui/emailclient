import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Email } from './email';
import { EmailService } from './email.service';

@Injectable({
  providedIn: 'root',
})
export class EmailResolverService implements Resolve<Email> {
  constructor(private emailsService: EmailService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const { id } = route.params;
    return this.emailsService.getEmail(id);
    // return {
    //   id: 'asdf',
    //   subject: 'asdf',
    //   text: 'asdf',
    //   to: 'asdf',
    //   from: 'asdf',
    //   html: 'asdf',
    // };
  }
}
