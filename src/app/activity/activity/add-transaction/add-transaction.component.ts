import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl,AbstractControl } from '@angular/forms';
import { ITransaction } from 'src/app/data_types/ITransaction';
import { ActivityDataService } from '../../activity-data.service';
import { IActivity } from 'src/app/data_types/IActivity';
import { HttpErrorResponse } from '@angular/common/http';
import { SharedMethodsService } from 'src/app/shared/shared-methods.service';
import { map, switchAll } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.css']
})
export class AddTransactionComponent implements OnInit {
  public transaction : FormGroup;
  public activity : IActivity;
  public errorMsg: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private activityDataService : ActivityDataService,
    private sharedService : SharedMethodsService
  ) { }

  ngOnInit() {
    this.transaction = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      payment: [3.50, Validators.required],
      paidBy: ['', Validators.required]
    });
    // this.route.params.subscribe(p => {
    //   if (this.activityDataService.localActivity && this.activityDataService.localActivity.activityId === +p['id']){
    //     this.activity = this.activityDataService.localActivity
    //   } else {
    //     this.activityDataService.getActivity$(+p['id']).subscribe(data => {
    //       this.activity = data;
    //     });
    //   }
    // });
    this.route.params.pipe(map(data => {
      if (this.activityDataService.localActivity && this.activityDataService.localActivity.activityId === +data['id']){
        return new BehaviorSubject(this.activityDataService.localActivity);
      } else {
        return this.activityDataService.getActivity$(+data['id']);
      }
    }), switchAll()).subscribe((data2: IActivity) => {
        this.activity = data2;
    });
  }

  onSubmit(){
    var modal: ITransaction = {
      name: this.transaction.value.name,
      description: this.transaction.value.description,
      payment: this.transaction.value.payment,
      paidBy: this.transaction.value.paidBy
  };
    this.activityDataService.addTransaction$(this.activity.activityId, modal).subscribe(
      ( id : number ) => this.router.navigate(['profile', 'activity', this.activity.activityId, 'transaction', id]),
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
    this.router.navigate(['profile', 'activity', this.activity.activityId]);
  }

  getValutaSymbol() : string{
    return this.activityDataService.currencyTypeSymbol(this.activity.currencyType);
  }

  formatHttpRequestError(json_str) : string[]{
    return this.sharedService.formatHttpRequestError(JSON.stringify(json_str));
  }
}
