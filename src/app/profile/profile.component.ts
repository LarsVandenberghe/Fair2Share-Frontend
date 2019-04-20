import { Component, OnInit } from '@angular/core';
import { ProfileDataService } from './profile-data.service';
import { IProfile } from '../data_types/IProfile';
import { AuthenticationService } from '../user/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private _profile : IProfile;
  public errorMessage: string;

  constructor(private dataService: ProfileDataService, private authService : AuthenticationService) { }

  ngOnInit() {
    this.dataService.getProfile$().subscribe(
      profile => this._profile = profile,
      err => this.errorMessage = err
    );
  }

  get profile() : IProfile{
    return this._profile;
  }

  get image() : string{
    if (this._profile != null){
      if (this._profile.pathToImage == null || this._profile.pathToImage == '' ){
        return "/assets/images/default-profile.gif";
      } else {
        return this._profile.pathToImage;
      }
    } else {
      return null;
    }
  }

  get loggedIn() : boolean {
    return this.authService.loggedIn();
  }
}
