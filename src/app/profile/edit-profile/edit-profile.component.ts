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
  public loading : boolean = false;

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
        this.loading = false;
      }
    } else {
      this.dataService.setSimpleprofile$(this.simpleProfile).subscribe(
        () => this.router.navigate(['profile'])
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
          console.log(res);
          this.dataService.setSimpleprofile$(this.simpleProfile).subscribe(
            () => this.router.navigate(['profile'])
          );
        });
  }

  removeImage() : void {
    var index = this.dataService.imageCatch.map( e => e.profileId).indexOf(this.simpleProfile.profileId);
    if (index !== -1) this.dataService.imageCatch.splice(index, 1);
    this.dataService.deleteProfileImage$().subscribe();
  }

}
