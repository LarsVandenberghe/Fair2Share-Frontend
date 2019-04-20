import { Component } from '@angular/core';
import { AuthenticationService } from './user/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Fair2Share';
  constructor(private authService : AuthenticationService, private _router : Router){
  }

  getLoggedIn() : boolean {
    return this.authService.loggedIn();
  }

  logOut() : void {
    this.authService.logout();
    this._router.navigateByUrl('/');

  }
}
