import { Component, OnInit, Input } from '@angular/core';
import { IActivity } from 'src/app/data_types/IActivity';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent implements OnInit {
  @Input() public activity: IActivity;
  constructor() { }

  ngOnInit() {
  }
  
  editActivity(): void{
    console.log(`${this.activity.name} clicked!`)
  }

}
