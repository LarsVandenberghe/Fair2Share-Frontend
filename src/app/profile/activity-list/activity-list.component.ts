import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IActivity } from 'src/app/data_types/IActivity';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent implements OnInit {
  @Input() public activity: IActivity;
  @Output() notify : EventEmitter<IActivity> = new EventEmitter<IActivity>();

  constructor() { }

  ngOnInit() {
  }
  
  deleteActivity(): void{
    //console.log(`${this.activity.name} clicked!`);
    this.notify.emit(this.activity);
  }

}
