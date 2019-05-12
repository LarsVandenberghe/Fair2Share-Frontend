import { Component, OnInit } from '@angular/core';
import { ProfileDataService } from '../profile-data.service';
import { ISimpleProfile } from 'src/app/data_types/ISimpleProfile';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(
    private dataService: ProfileDataService,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.dataService.getSimpleProfile$().subscribe(
      data => {
        this.simpleProfile = data;
        this.profile = this.fb.group({
          firstName: [this.simpleProfile.firstname],
          lastName: [this.simpleProfile.lastname],
          //pathToImage: [this.simpleProfile.pathToImage]
        });
      }
    );
  }


  onSubmit() {
    this.simpleProfile.firstname = this.profile.value.firstName;
    this.simpleProfile.lastname = this.profile.value.lastName;
    // if (this.profile.value.pathToImage != null && this.profile.value.pathToImage != '') {
    //   this.simpleProfile.pathToImage = this.profile.value.pathToImage;
    // }
    if (this.changeImage){
      if (this.image == null){
        this.removeImage();
        this.dataService.setSimpleprofile$(this.simpleProfile).subscribe(
          () => this.router.navigate(['profile'])
        );
      }
      else {
        this.addImage(this.image);
      }
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
          console.log(res);
          this.dataService.setSimpleprofile$(this.simpleProfile).subscribe(
            () => this.router.navigate(['profile'])
          );
        });
  }

  removeImage() : void {
    this.dataService.deleteProfileImage$().subscribe();
  }

}
