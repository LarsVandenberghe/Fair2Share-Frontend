import { Component, OnInit } from '@angular/core';
import { FriendRequestDataService } from '../friend-request-data.service';
import { IFriend } from 'src/app/data_types/IFriend';
import { Router } from '@angular/router';

@Component({
  //selector: 'app-friend-requests',
  templateUrl: './friend-requests.component.html',
  styleUrls: ['./friend-requests.component.css']
})
export class FriendRequestsComponent implements OnInit {
  private _futureFriends : IFriend[];
  private _deniedFutureFriends : IFriend[];
  public isCollapsed: boolean = true;
  constructor(private friendRequestData : FriendRequestDataService, private router: Router) { }

  ngOnInit() {
    this.friendRequestData.getFriendRequests$().subscribe( data => {
      this._futureFriends = data.filter( friend => friend.friendRequestState === 0);
      this._deniedFutureFriends = data.filter( friend => friend.friendRequestState === 1);
    });
  }

  getFutureFriends() : IFriend[]{
    return this._futureFriends;
  }

  getDeniedFutureFriends() : IFriend[]{
    return this._deniedFutureFriends;
  }

  handleFriendRequest(friend : IFriend, accept : boolean) : void {
    this.friendRequestData.handleFriendRequest$(friend.profileId, accept).subscribe((data) => {
      this.ngOnInit();
    });
  } 

}
