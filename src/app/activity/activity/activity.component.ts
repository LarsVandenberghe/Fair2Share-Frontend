import { Component, OnInit, Input } from '@angular/core';
import { IActivity } from '../../data_types/IActivity';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap, flatMap } from 'rxjs/operators';
import { ActivityDataService } from '../activity-data.service';
import { ISummary } from 'src/app/data_types/ISummary';
import { IFriend } from 'src/app/data_types/IFriend';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  public activity: IActivity;
  public errorMessage : string;
  public summary : ISummary[]
  public toggleSummary : boolean = true;

  constructor(private dataService: ActivityDataService, private router : Router, private route: ActivatedRoute) { }

  ngOnInit() {
    // if (this.dataService.localActivityId == null){
    //   this.errorMessage = "Invalid action, please select an activity on your profile!"
    // } else {
      this.route.params.subscribe(params => {
        this.dataService.getActivity$(+params['id']).subscribe(data => {
          this.activity = data;
          this.dataService.getActivitySummary$(data.activityId).subscribe(data2 => {
            this.summary = data2;
          });
        });
     });
      // this.dataService.getActivity$(this.dataService.localActivityId).subscribe(data => {
      //   this.activity = data;
      //   this.dataService.getActivitySummary$(data.activityId).subscribe(data2 => {
      //     this.summary = data2;
      //   });
      // });
    // }
  }

  getIFriendForId(id : number) : IFriend{
    return this.activity.participants.find(p => p.profileId === id);
  }

  formatMoney(value: number) : string{
    if (this.activity.currencyType === 0){
      return `€ ${Number(value).toFixed(2)}`;
    } else if (this.activity.currencyType === 1){
      return `$ ${Number(value).toFixed(2)}`;
    } else if (this.activity.currencyType === 2){
      return `£ ${Number(value).toFixed(2)}`;
    }
  }

  goToManageParticipants() : void {
    this.dataService.localActivity = this.activity;
    this.router.navigate(['profile', 'activity', this.activity.activityId, 'participants']);
  }
}
