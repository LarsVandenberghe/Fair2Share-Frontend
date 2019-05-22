import { Component, OnInit } from '@angular/core';
import { ActivityDataService } from '../activity-data.service';
import { FormGroup, FormBuilder, FormControl, AbstractControl} from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileDataService } from 'src/app/profile/profile-data.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SharedMethodsService } from 'src/app/shared/shared-methods.service';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css']
})
export class AddActivityComponent implements OnInit {
  public activity: FormGroup;
  public valutas: string[] = ["EURO", "DOLLAR", "POUND"];
  public selectedValuta: string = "EURO"; 
  public errorMsg: string;

  constructor(
    private fb: FormBuilder,
    private dataService: ActivityDataService,
    private router: Router,
    private sharedService : SharedMethodsService
    ) {}

  ngOnInit() {
    this.activity = this.fb.group({
      name: [''],
      description: [''],
      valuta: ['']
    });
    //select first value in control
    this.activity.controls.valuta.setValue(this.valutas[0]);
  }

  onSubmit() {
    if (this.valutas.indexOf(this.activity.value.valuta) < 0){
      throw new Error(`invalid selection! ${this.activity.value.valuta}`);
    }
    //let id : number;
    this.dataService.addActivity$(
      this.activity.value.name,
      this.activity.value.description,
      this.valutas.indexOf(this.activity.value.valuta)
    ).subscribe(
      val => {
        this.router.navigate(['profile', 'activity', val]);
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
}
