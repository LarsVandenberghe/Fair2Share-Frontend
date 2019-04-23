import { Component, OnInit, Input } from '@angular/core';
import { IActivity } from '../../data_types/IActivity';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  @Input() public activity: IActivity;
  constructor() { }

  ngOnInit() {
  }
}
