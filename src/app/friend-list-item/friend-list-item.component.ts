import { Component, OnInit, Input } from '@angular/core';
import { IFriend } from '../data_types/IFriend';

@Component({
  selector: 'app-friend-list-item',
  templateUrl: './friend-list-item.component.html',
  styleUrls: ['./friend-list-item.component.css']
})
export class FriendListItemComponent implements OnInit {
  @Input() public friend: IFriend;
  constructor() { }

  ngOnInit() {
  }

  get image() : string{
    if (this.friend.pathToImage == null || this.friend.pathToImage == '' ){
      return "/assets/images/default-profile.gif";
    } else {
      return this.friend.pathToImage;
    }
  }
}
