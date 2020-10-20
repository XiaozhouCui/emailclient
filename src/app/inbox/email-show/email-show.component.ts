import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/Operators';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.css'],
})
export class EmailShowComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private emailService: EmailService
  ) {}

  ngOnInit(): void {
    // ActivatedRoute.params is a BehaviorSubject
    this.route.params
      .pipe(
        // use switchMap to cancel previous slow requests, only pass latest request
        switchMap(({ id }) => {
          // console.log(id); // "0ea743970726bb89" (key "id" comes from ":id" in routing)
          return this.emailService.getEmail(id);
        })
      )
      .subscribe((email) => {
        console.log(email);
      });

    // this.route.params.subscribe(({ id }) => {
    //   this.emailService.getEmail(id).subscribe((email) => {
    //     console.log(email);
    //   });
    // });

    // Snapshot
    // console.log(this.route.snapshot.params.id); // "0ea743970726bb89", same value but not going to update until component is destroyed
  }
}
