import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IActivity } from 'src/app/data_types/IActivity';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent implements OnInit {
  @Input() public activity: IActivity;
  @Output() notify : EventEmitter<IActivity> = new EventEmitter<IActivity>();

  constructor(
    private router : Router
  ) { }

  ngOnInit() {
  }
  
  deleteActivity(): void{
    //console.log(this.activity);
    this.notify.emit(this.activity);
  }

}
