import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../user/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthenticationService) { 
  }

  ngOnInit() {
  }

  loggedIn():boolean {
    return this.authService.token !== '';
  }

}
