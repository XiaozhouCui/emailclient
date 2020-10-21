import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Email } from './email';
import { EmailService } from './email.service';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailResolverService implements Resolve<Email> {
  constructor(private emailsService: EmailService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot) {
    const { id } = route.params;
    return this.emailsService.getEmail(id).pipe(
      catchError((err) => {
        this.router.navigateByUrl('/inbox/not-found');
        // EMPTY is an observable marked as complete()
        return EMPTY;
      })
    );
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
