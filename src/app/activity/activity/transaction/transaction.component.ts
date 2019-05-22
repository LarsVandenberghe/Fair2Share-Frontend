import { Component, OnInit } from '@angular/core';
import { ActivityDataService } from '../../activity-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IActivity } from 'src/app/data_types/IActivity';
import { ITransaction } from 'src/app/data_types/ITransaction';

@Component({
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  public activity : IActivity;
  public transaction : ITransaction;
  public errorMessage : string;

  constructor(
    private dataService: ActivityDataService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (this.dataService.localActivity && this.dataService.localActivity.activityId === +params['id']){
          this.activity = this.dataService.localActivity;
          this.dataService.getTransaction$(this.activity.activityId, +params['transaction-id']).subscribe(t => {
            this.transaction = t;
          });
          
      }else {
        this.dataService.getActivity$(+params['id']).subscribe(data => {
          this.activity = data;
          this.dataService.getTransaction$(this.activity.activityId, +params['transaction-id']).subscribe(t => {
            this.transaction = t;
          });
        });
      }
   });
  }


  back(){
    this.router.navigate(['profile', 'activity', this.activity.activityId]);
  }

  edit(){
    this.router.navigate(['profile', 'activity', this.activity.activityId, 'transaction', this.transaction.transactionId, 'edit']);
  }

  delete(){
    this.dataService.removeTransaction$(this.activity.activityId, this.transaction.transactionId)
    .subscribe(() => {this.router.navigate(['profile', 'activity', this.activity.activityId]);}, err => this.errorMessage = err.error);
  }

  formattedMoney() : string{
    return `${this.dataService.currencyTypeSymbol(this.activity.currencyType)} ${Number(this.transaction.payment).toFixed(2)}`;
    
  }

}
