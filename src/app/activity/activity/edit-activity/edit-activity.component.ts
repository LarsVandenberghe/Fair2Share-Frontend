import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivityDataService } from '../../activity-data.service';
import { SharedMethodsService } from 'src/app/shared/shared-methods.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { IActivity } from 'src/app/data_types/IActivity';

@Component({
  templateUrl: './edit-activity.component.html',
  styleUrls: ['./edit-activity.component.css']
})
export class EditActivityComponent implements OnInit {
  public activity: FormGroup;
  public valutas: string[] = ["EURO", "DOLLAR", "POUND"];
  public selectedValuta: string = "EURO"; 
  public errorMsg: string;
  public old_activity: IActivity;

  constructor(
    private fb: FormBuilder,
    private dataService: ActivityDataService,
    private router: Router,
    private route: ActivatedRoute,
    private sharedService : SharedMethodsService
    ) {}

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.dataService.getActivity$(+p['id']).subscribe(data => {
        this.old_activity = data;
        this.buildForm();
      });
    });
  }

  onSubmit() {
    if (this.valutas.indexOf(this.activity.value.valuta) < 0){
      throw new Error(`invalid selection! ${this.activity.value.valuta}`);
    }
    var modal : IActivity = {
      activityId: this.old_activity.activityId,
      name: this.activity.value.name,
      description: this.activity.value.description,
      currencyType: this.valutas.indexOf(this.activity.value.valuta)
    };
    this.dataService.updateActivity$( this.old_activity.activityId, modal).subscribe(
      val => {
        this.router.navigate(['profile', 'activity', this.old_activity.activityId]);
      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          this.errorMsg = err.error.message;
        } else {
          this.errorMsg = err.error;
        }
      }
    )
  }

  handleCancle(){
    this.router.navigateByUrl("/profile");
  }

  formatHttpRequestError(json_str) : string[]{
    return this.sharedService.formatHttpRequestError(JSON.stringify(json_str));
  }

  buildForm(){
    this.activity = this.fb.group({
      name: [this.old_activity.name, Validators.required],
      description: [this.old_activity.description],
      valuta: ['', Validators.required]
    });
    this.activity.controls.valuta.setValue(this.valutas[this.old_activity.currencyType]);
  }
}
