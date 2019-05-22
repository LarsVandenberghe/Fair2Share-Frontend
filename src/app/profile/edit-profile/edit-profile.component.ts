import { Component, OnInit } from '@angular/core';
import { ProfileDataService } from '../profile-data.service';
import { ISimpleProfile } from 'src/app/data_types/ISimpleProfile';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { SharedMethodsService } from 'src/app/shared/shared-methods.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  public simpleProfile: ISimpleProfile;
  public profile: FormGroup;
  public image: any;
  public changeImage: boolean = false;
  public loading : boolean = false;
  public errorMsg : string;

  constructor(
    private dataService: ProfileDataService,
    private router: Router,
    private fb: FormBuilder,
    private sharedService : SharedMethodsService
    ) { }

  ngOnInit() {
    this.dataService.getSimpleProfile$().subscribe(
      data => {
        this.simpleProfile = data;
        this.profile = this.fb.group({
          firstName: [this.simpleProfile.firstname],
          lastName: [this.simpleProfile.lastname],
        });
      }
    );
  }


  onSubmit() {
    this.simpleProfile.firstname = this.profile.value.firstName;
    this.simpleProfile.lastname = this.profile.value.lastName;

    if (this.changeImage){
      if (this.image == null){
        this.removeImage();
        this.dataService.setSimpleprofile$(this.simpleProfile).subscribe(
          () => this.router.navigate(['profile'])
        );
      }
      else {
        this.loading = true;
        this.addImage(this.image);
        
      }
    } else {
      this.dataService.setSimpleprofile$(this.simpleProfile).subscribe(
        () => this.router.navigate(['profile']),   
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            this.errorMsg = err.error.message;
          } else {
            this.errorMsg = err.error;
          }
        }
      );
    }
  }

  onNotify(image: any) {
    this.changeImage = true;
    this.image = image;
    //console.log("I got here!");
  }

  onNotifyChangeImage(change : boolean){
    this.changeImage = change;
  }

  addImage(fileInput: any): void {
      this.dataService
        .uploadImage$(fileInput)
        .subscribe(res => {
          //console.log(res);
          this.dataService.setSimpleprofile$(this.simpleProfile).subscribe(
            () => {this.router.navigate(['profile']); this.loading = false;}
          );
        });
  }

  removeImage() : void {
    var index = this.dataService.imageCatch.map( e => e.profileId).indexOf(this.simpleProfile.profileId);
    if (index !== -1) this.dataService.imageCatch.splice(index, 1);
    this.dataService.deleteProfileImage$().subscribe();
  }

  formatHttpRequestError(json_str) : string[]{
    return this.sharedService.formatHttpRequestError(JSON.stringify(json_str));
  }
}
