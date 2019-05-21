import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl,AbstractControl } from '@angular/forms';
import { ITransaction } from 'src/app/data_types/ITransaction';
import { ActivityDataService } from '../activity-data.service';
import { IActivity } from 'src/app/data_types/IActivity';

@Component({
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.css']
})
export class AddTransactionComponent implements OnInit {
  //private activityId : number;
  public transaction : FormGroup;
  public activity : IActivity;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private activityDataService : ActivityDataService
  ) { }

  ngOnInit() {
    this.transaction = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      payment: [3.50, Validators.required],
      paidBy: ['', Validators.required]
    });
    this.route.params.subscribe(p => {
      if (this.activityDataService.localActivity && this.activityDataService.localActivity.activityId === +p['id']){
        this.activity = this.activityDataService.localActivity
      } else {
        this.activityDataService.getActivity$(+p['id']).subscribe(data => {
          this.activity = data;
        });
      }
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
      () => this.router.navigate(['profile', 'activity', this.activity.activityId])
    );
  }

  handleCancle(){
    this.router.navigate(['profile', 'activity', this.activity.activityId]);
  }

  getValutaSymbol() : string{
    return this.activityDataService.currencyTypeSymbol(this.activity.currencyType);
  }

}
