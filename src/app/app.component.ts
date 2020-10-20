import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  signedin = false;
  constructor(private authService: AuthService) {}

  // listen to observable on start
  ngOnInit() {
    this.authService.signedin$.subscribe((signedin) => {
      this.signedin = signedin;
    });

    // check if user is signed in
    // checkAuth() will return an observable and will emit "true" or "false"
    this.authService.checkAuth().subscribe(() => {});

    // // signout after 5 seconds
    // setTimeout(() => {
    //   this.authService.signout().subscribe(() => {});
    // });
  }
}
