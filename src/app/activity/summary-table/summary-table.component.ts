import { Component, OnInit, Input } from '@angular/core';
import { IFriend } from 'src/app/data_types/IFriend';
import { IActivity } from 'src/app/data_types/IActivity';
import { ActivityDataService } from '../activity-data.service';
import { ISummary } from 'src/app/data_types/ISummary';

@Component({
  selector: 'app-summary-table',
  templateUrl: './summary-table.component.html',
  styleUrls: ['./summary-table.component.css']
})
export class SummaryTableComponent implements OnInit {
  @Input() public activity : IActivity;
  public summary : ISummary[];

  constructor(private dataService : ActivityDataService) { }

  ngOnInit() {
    this.dataService.getActivitySummary$(this.activity.activityId).subscribe(data2 => {
      this.summary = data2;
    });
  }

  getIFriendForId(id : number) : IFriend{
    return this.activity.participants.find(p => p.profileId === id);
  }

  formatMoney(value: number) : string{
    return this.dataService.currencyTypeSymbol(this.activity.currencyType) + ` ${Number(value).toFixed(2)}`;
  }
}
