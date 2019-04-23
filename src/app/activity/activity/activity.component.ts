import { Component, OnInit, Input } from '@angular/core';
import { IActivity } from '../../data_types/IActivity';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap, flatMap } from 'rxjs/operators';
import { ActivityDataService } from '../activity-data.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  private _activity$: IActivity;
  constructor(private activatedRoute: ActivatedRoute, private dataService: ActivityDataService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.pipe(
      map(() => window.history.state),
      flatMap((a: IActivity) => this.dataService.getActivity$(a.activityId))
    ).subscribe(act => this._activity$ = act);
  }

  public get activity$(): IActivity{
    return this._activity$;
  }
}
