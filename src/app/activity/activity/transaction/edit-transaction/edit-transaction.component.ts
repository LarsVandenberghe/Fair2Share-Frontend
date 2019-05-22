import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IActivity } from 'src/app/data_types/IActivity';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityDataService } from 'src/app/activity/activity-data.service';
import { ITransaction } from 'src/app/data_types/ITransaction';
import { SharedMethodsService } from 'src/app/shared/shared-methods.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  templateUrl: './edit-transaction.component.html',
  styleUrls: ['./edit-transaction.component.css']
})
export class EditTransactionComponent implements OnInit {

  public transactionEditted : FormGroup;
  public activity : IActivity;
  public transaction : ITransaction;
  public errorMsg: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private activityDataService : ActivityDataService,
    private sharedService: SharedMethodsService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      if (this.activityDataService.localActivity && this.activityDataService.localActivity.activityId === +p['id']){
        this.activity = this.activityDataService.localActivity;
        this.activityDataService.getTransaction$(+p['id'], +p['transaction-id']).subscribe(data => {
          this.transaction = data;
          this.buildForm();
        });
      } else {
        this.activityDataService.getActivity$(+p['id']).subscribe(data => {
          this.activity = data;
          this.activityDataService.getTransaction$(+p['id'], +p['transaction-id']).subscribe(data2 => {
            this.transaction = data2;
            this.buildForm();
          });
        });
      }
    });
  }

  onSubmit(){
    var modal: ITransaction = {
      name: this.transactionEditted.value.name,
      description: this.transactionEditted.value.description,
      payment: this.transactionEditted.value.payment,
      paidBy: this.transactionEditted.value.paidBy
  };
    this.activityDataService.updateTransaction$(this.activity.activityId, this.transaction.transactionId ,modal).subscribe(
      () => this.router.navigate(['profile', 'activity', this.activity.activityId, 'transaction', this.transaction.transactionId]),
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          this.errorMsg = err.error.message;
        } else {
          this.errorMsg = err.error;
        }
      }
    );
  }

  handleCancle(){
    this.router.navigate(['profile', 'activity', this.activity.activityId, 'transaction', this.transaction.transactionId]);
  }

  getValutaSymbol() : string{
    return this.activityDataService.currencyTypeSymbol(this.activity.currencyType);
  }

  buildForm(){
    this.transactionEditted = this.fb.group({
      name: [this.transaction.name, Validators.required],
      description: [this.transaction.description],
      payment: [this.transaction.payment, Validators.required],
      paidBy: ['', Validators.required]
    });
    this.transactionEditted.controls['paidBy'].setValue(this.activity.participants.filter(p => p.profileId === this.transaction.paidBy.profileId).pop());
  }

  formatHttpRequestError(json_str) : string[]{
    return this.sharedService.formatHttpRequestError(JSON.stringify(json_str));
  }
}
