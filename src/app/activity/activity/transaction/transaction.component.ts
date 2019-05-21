import { Component, OnInit } from '@angular/core';
import { ActivityDataService } from '../../activity-data.service';
import { ActivatedRoute } from '@angular/router';
import { IActivity } from 'src/app/data_types/IActivity';
import { ITransaction } from 'src/app/data_types/ITransaction';

@Component({
  //selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  public activity : IActivity;
  public transaction : ITransaction;

  constructor(
    private dataService: ActivityDataService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (this.dataService.localActivity && this.dataService.localActivity.activityId === +params['id']){
          this.activity = this.dataService.localActivity;
          this.dataService.getTransactions$(this.activity.activityId).subscribe(t => {
            this.transaction = t.filter(tr => tr.transactionId === +params['transaction-id']).pop();
          });
          
      }else {
        this.dataService.getActivity$(+params['id']).subscribe(data => {
          this.activity = data;
          this.dataService.getTransactions$(this.activity.activityId);
          this.dataService.getTransactions$(this.activity.activityId).subscribe(t => {
            this.transaction = t.filter(tr => tr.transactionId === +params['transaction-id']).pop();
          });
        });
      }
   });
  }

}
