import { Component, OnInit } from '@angular/core';
import { ProfileDataService } from '../profile-data.service';
import { IProfile } from '../../data_types/IProfile';
import { AuthenticationService } from '../../user/authentication.service';
import { Router } from '@angular/router';
import { IActivity } from '../../data_types/IActivity';
import { ActivityDataService } from 'src/app/activity/activity-data.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private _profile : IProfile;
  public errorMessage: string;
  public imageToShow: any;
  public isImageLoading : boolean = true;

  constructor(
    private dataService: ProfileDataService, 
    private authService : AuthenticationService, 
    private router: Router,
    private activityService: ActivityDataService) { }
    

  ngOnInit() {
    this.dataService.getProfile$().subscribe(
      profile => {
        this._profile = profile;
        
        this.dataService.getProfileImage$(this._profile.profileId).subscribe(
          data => {
            this.createImageFromBlob(data);
            this.isImageLoading = false;
          }, error => {
            this.isImageLoading = false;
            console.log(error);
          }
        );
      },
      err => this.errorMessage = err
    );
    
  }

  get profile() : IProfile{
    return this._profile;
  }

  get image() : string{
    if (this._profile != null){
      if (this.imageToShow == null ){
        return "/assets/images/default-profile.gif";
      } else {
        return this.imageToShow;
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
    //this.activityService.localActivityId = activity.activityId;
    this.router.navigate(['profile', 'activity', activity.activityId]);
  }

  onDeleteActivity(activity : IActivity){
    this.activityService.deleteActivity$(activity.activityId).subscribe(
      () => {
        this._profile.activities = this.profile.activities.filter(e => e.activityId !== activity.activityId);
      },
      (err: HttpErrorResponse) => {
        console.log(err);
        if (err.error instanceof Error) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage = err.error;
        }
      });
  }

  viewFriendRequests(){
    this.router.navigate(['profile', 'friend-requests']);
  }

  viewAddFriend(){
    this.router.navigate(['profile', 'send-friend-request']);
  }

  viewEditProfile(){
    this.router.navigate(['profile', 'edit-profile']);
  }

  private createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.imageToShow = reader.result;
    }, false);
 
    if (image) {
       reader.readAsDataURL(image);
    }
 }
}
