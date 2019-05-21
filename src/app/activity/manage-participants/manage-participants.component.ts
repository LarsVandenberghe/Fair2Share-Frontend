import { Component, OnInit } from '@angular/core';
import { ProfileDataService } from 'src/app/profile/profile-data.service';
import { ActivityDataService } from '../activity-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IFriend } from 'src/app/data_types/IFriend';
import { IActivity } from 'src/app/data_types/IActivity';

@Component({
  //selector: 'app-manage-participants',
  templateUrl: './manage-participants.component.html',
  styleUrls: ['./manage-participants.component.css']
})
export class ManageParticipantsComponent implements OnInit {
  public allFriends: IFriend[] = [];
  public activityMembers: IFriend[] = [];
  public toBeAdded: IFriend[] = [];
  public toBeRemoved: IFriend[] = [];
  public activity: IActivity;
  public myId: number;
  public errorMesage: string;

  constructor(
    private profileDataService: ProfileDataService,
    private dataService: ActivityDataService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      if (this.dataService.localActivity && this.dataService.localActivity.activityId === +params['id']) {
        this.activity = this.dataService.localActivity
        this.activityMembers = this.activity.participants;
        this.profileDataService.getProfile$().subscribe(data => {
          this.allFriends = data.friends;
          this.myId = data.profileId;
        });
      } else {
        this.dataService.getActivity$(+params['id']).subscribe(data => {
          this.activity = data;
          this.activityMembers = this.activity.participants;
          this.profileDataService.getProfile$().subscribe(data2 => {
            this.allFriends = data2.friends;
            this.myId = data2.profileId;
          });
        });
      }
    });
  }

  getInActivity(): IFriend[] {
    return this.activityMembers.filter(a => this.toBeRemoved.filter(b => a.profileId === b.profileId).length === 0).concat(this.toBeAdded);
  }

  getNotInActivity(): IFriend[] {
    var out: IFriend[] = this.allFriends.filter(f => this.getInActivity().filter(p => p.profileId === f.profileId).length === 0);
    return out;
  }

  addToToBeAdded(friend: IFriend) {
    if (this.toBeRemoved.filter(p => p.profileId === friend.profileId).length > 0) {
      var index = this.toBeRemoved.map(e => e.profileId).indexOf(friend.profileId);
      if (index !== -1) this.toBeRemoved.splice(index, 1);
    } else {
      this.toBeAdded.push(friend);
    }
  }

  addToToBeRemoved(friend: IFriend) {
    if (this.toBeAdded.filter(p => p.profileId === friend.profileId).length > 0) {
      var index = this.toBeAdded.map(e => e.profileId).indexOf(friend.profileId);
      if (index !== -1) this.toBeAdded.splice(index, 1);
    } else {
      this.toBeRemoved.push(friend);
    }
  }

  save() {
    if (this.toBeRemoved.length > 0 && this.toBeAdded.length > 0) {
      this.dataService.removeParticipantsFromActivity$(this.activity.activityId, this.toBeRemoved)
        .subscribe(() => {
          this.dataService.addParticipantsToActivity$(this.activity.activityId, this.toBeAdded)
            .subscribe(() => {
              this.router.navigate(['profile', 'activity', this.activity.activityId]);
            });
        }, err => {
          this.errorMesage = err.error;
        });
    } else if (this.toBeRemoved.length > 0) {
      this.dataService.removeParticipantsFromActivity$(this.activity.activityId, this.toBeRemoved)
        .subscribe(() => {
          this.router.navigate(['profile', 'activity', this.activity.activityId]);
        }, err => {
          this.errorMesage = err.error;
        });
    } else if (this.toBeAdded.length > 0) {
      this.dataService.addParticipantsToActivity$(this.activity.activityId, this.toBeAdded)
        .subscribe(() => {
          this.router.navigate(['profile', 'activity', this.activity.activityId]);
        });
    } else {
      this.router.navigate(['profile', 'activity', this.activity.activityId]);
    }
  }
}
