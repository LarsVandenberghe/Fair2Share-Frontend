import { Component, OnInit } from '@angular/core';
import { ProfileDataService } from '../profile-data.service';
import { IProfile } from '../../data_types/IProfile';
import { AuthenticationService } from '../../user/authentication.service';
import { Router } from '@angular/router';
import { IActivity } from '../../data_types/IActivity';
import { ActivityDataService } from 'src/app/activity/activity-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private _profile : IProfile;
  public errorMessage: string;

  constructor(
    private dataService: ProfileDataService, 
    private authService : AuthenticationService, 
    private router: Router,
    private activityService: ActivityDataService) { }

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

  addActivity() : void{
    this.router.navigateByUrl(this.router.url + "/add-activity");
  }

  onEditActivity(activity : IActivity){
    this.activityService.localActivityId = activity.activityId;
    this.router.navigate(['profile', 'activity']);
  }

  onDeleteActivity(activity : IActivity){
    this.activityService.deleteActivity$(activity.activityId).subscribe(
      () => {
        // //reload profile
        // this.dataService.getProfile$().subscribe(
        //   profile => this._profile = profile,
        //   err => this.errorMessage = err
        // );
        this._profile.activities = this.profile.activities.filter(e => e.activityId !== activity.activityId);
      });
  }

  viewFriendRequests(){
    this.router.navigate(['profile', 'friend-requests']);
  }

  viewAddFriend(){
    this.router.navigate(['profile', 'send-friend-request']);
  }
}
