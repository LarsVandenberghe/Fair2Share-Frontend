import { Component, OnInit, Input } from '@angular/core';
import { IFriend } from '../../data_types/IFriend';
import { ProfileDataService } from '../profile-data.service';
import { IImageProfileInter } from 'src/app/data_types/IImageProfileInter';

@Component({
  selector: 'app-friend-list-item',
  templateUrl: './friend-list-item.component.html',
  styleUrls: ['./friend-list-item.component.css']
})
export class FriendListItemComponent implements OnInit {
  @Input() public friend: IFriend;
  public imageToShow: any;
  public isImageLoading : boolean = true;

  constructor(private dataService : ProfileDataService) { }

  ngOnInit() {
    this.dataService.getProfileImage$(this.friend.profileId).subscribe(
      data => {
        if (data != null){
          var modal: IImageProfileInter = { image: data, profileId: this.friend.profileId };
          this.dataService.imageCatch.push(modal);
        }
        this.createImageFromBlob(data);
        this.isImageLoading = false;
      }, error => {
        this.isImageLoading = false;
        console.log(error);
      }
    );
  }

  get image() : string{
    if (this.imageToShow == null ){
      return "/assets/images/default-profile.gif";
    } else {
      return this.imageToShow;
    }
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
