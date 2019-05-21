import { Component, OnInit, Input } from '@angular/core';
import { IActivity } from '../../data_types/IActivity';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityDataService } from '../activity-data.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  public activity: IActivity;
  public errorMessage : string;
  public toggleSummary : boolean = true;

  constructor(private dataService: ActivityDataService, private router : Router, private route: ActivatedRoute) { }

  ngOnInit() {
      this.route.params.subscribe(params => {
        this.dataService.getActivity$(+params['id']).subscribe(data => {
          this.activity = data;
          this.dataService.localActivity = this.activity;
        });
     });
  }

  goToManageParticipants() : void {
    this.router.navigate(['profile', 'activity', this.activity.activityId, 'participants']);
  }
}
