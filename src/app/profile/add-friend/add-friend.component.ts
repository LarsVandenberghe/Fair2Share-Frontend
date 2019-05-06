import { Component, OnInit } from '@angular/core';
import { FriendRequestDataService } from '../friend-request-data.service';
import { AuthenticationService } from 'src/app/user/authentication.service';

@Component({
  //selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.css']
})
export class AddFriendComponent implements OnInit {
  public succes : boolean;
  constructor( private dataService : FriendRequestDataService, private userDataService : AuthenticationService) { }

  ngOnInit() {
  }



}
