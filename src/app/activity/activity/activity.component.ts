import { Component, OnInit, Input } from '@angular/core';
import { IActivity } from '../../data_types/IActivity';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap, flatMap } from 'rxjs/operators';
import { ActivityDataService } from '../activity-data.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  private _activity$: Observable<IActivity>;
  public errorMessage : string;
  constructor(private dataService: ActivityDataService, private router : Router) { }

  ngOnInit() {
    if (this.dataService.localActivityId == null){
      this.errorMessage = "Invalid action, please select an activity on your profile!"
    }else {
      this._activity$ = this.dataService.getActivity$(this.dataService.localActivityId);
    }
    
    // this.activatedRoute.paramMap.pipe(
    //   (a: IActivity) => this.dataService.getActivity$(a.activityId))
    // ).subscribe(act => {
    //   this._activity$ = act;
    //   console.log("TODO: page not found!");
    // });
    // this._activity$ = {name: "test", activityId: 0, description: "", currencyType: 1, participants: []};
  }

  public get activity$(): Observable<IActivity>{
    return this._activity$;
  }
}
