import { Component, OnInit, Input } from '@angular/core';
import { IActivity } from 'src/app/data_types/IActivity';
import { ITransaction } from 'src/app/data_types/ITransaction';
import { ActivityDataService } from '../activity-data.service';

@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrls: ['./transaction-table.component.css']
})
export class TransactionTableComponent implements OnInit {
  @Input() public activity : IActivity
  public transactions : ITransaction[];
  constructor(private dataService : ActivityDataService) { }

  ngOnInit() {
    this.dataService.getTransactions$(this.activity.activityId).subscribe(data => {
      this.transactions = data;
      console.log(data);
    });
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
}
