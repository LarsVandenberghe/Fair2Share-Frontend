import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ITransaction } from 'src/app/data_types/ITransaction';
import { IActivity } from 'src/app/data_types/IActivity';
import { ProfileDataService } from 'src/app/profile/profile-data.service';
import { IFriend } from 'src/app/data_types/IFriend';
import { ActivityDataService } from 'src/app/activity/activity-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-tparticipants',
  templateUrl: './manage-tparticipants.component.html',
  styleUrls: ['./manage-tparticipants.component.css']
})
export class ManageTParticipantsComponent implements OnInit {

  @Input() transaction : ITransaction;
  @Input() activity : IActivity;
  @Output() notify : EventEmitter<ITransaction> = new EventEmitter<ITransaction>();

  public allFriends: IFriend[] = [];
  public transactionMembers: IFriend[] = [];
  public toBeAdded: IFriend[] = [];
  public toBeRemoved: IFriend[] = [];
  public errorMesage: string;
  public saved : boolean = false;
  public undone : boolean = false;
  
  constructor(
    private profileDataService: ProfileDataService,
    private dataService: ActivityDataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.transactionMembers = this.transaction.profilesInTransaction;
    this.allFriends = this.activity.participants;
  }

  reload(){
    this.transactionMembers = this.transaction.profilesInTransaction;
    this.allFriends = this.activity.participants;
    this.toBeAdded = [];
    this.toBeRemoved = [];
    this.saved = false;
    this.undone = true;
  }

  getInTransaction(): IFriend[] {
    return this.transactionMembers.filter(a => this.toBeRemoved.filter(b => a.profileId === b.profileId).length === 0).concat(this.toBeAdded);
  }

  getNotInTransaction(): IFriend[] {
    var out: IFriend[] = this.allFriends.filter(f => this.getInTransaction().filter(p => p.profileId === f.profileId).length === 0);
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
      this.dataService.removeParticipantsFromTransaction$(this.activity.activityId, this.transaction.transactionId,this.toBeRemoved)
        .subscribe(() => {
          this.dataService.addParticipantsToTransaction$(this.activity.activityId, this.transaction.transactionId, this.toBeAdded)
            .subscribe(() => {
              this.notify.emit();
              this.saved = true;
              this.undone = false;
            });
        }, err => {
          this.errorMesage = err.error;
        });
    } else if (this.toBeRemoved.length > 0) {
      this.dataService.removeParticipantsFromTransaction$(this.activity.activityId, this.transaction.transactionId, this.toBeRemoved)
        .subscribe(() => {
          this.notify.emit();
          this.saved = true;
          this.undone = false;
        }, err => {
          this.errorMesage = err.error;
        });
    } else if (this.toBeAdded.length > 0) {
      this.dataService.addParticipantsToTransaction$(this.activity.activityId, this.transaction.transactionId, this.toBeAdded)
        .subscribe(() => {
          this.notify.emit();
          this.saved = true;
          this.undone = false;
        });
    } else {
      this.notify.emit();
      this.saved = true;
      this.undone = false;
    }

  }

  resetMessages(){
    this.saved = false;
    this.undone = false;
  }
}
