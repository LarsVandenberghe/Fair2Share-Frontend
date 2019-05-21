import { Component, OnInit, Input } from '@angular/core';
import { IActivity } from 'src/app/data_types/IActivity';
import { ITransaction } from 'src/app/data_types/ITransaction';
import { ActivityDataService } from '../activity-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrls: ['./transaction-table.component.css']
})
export class TransactionTableComponent implements OnInit {
  @Input() public activity : IActivity
  public transactions : ITransaction[];

  constructor(
    private dataService : ActivityDataService,
    private router : Router
    ) { }

  ngOnInit() {
    this.dataService.getTransactions$(this.activity.activityId).subscribe(data => {
      this.transactions = data;
      //console.log(data);
    });
  }

  formatMoney(value: number) : string{
    return this.dataService.currencyTypeSymbol(this.activity.currencyType) + ` ${Number(value).toFixed(2)}`;
  }

  addTransaction(){
    this.router.navigate(["profile", "activity", this.activity.activityId, "add-transaction"]);
  }
}
