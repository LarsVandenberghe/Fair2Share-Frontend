import { Component, OnInit } from '@angular/core';
import { ActivityDataService } from '../activity-data.service';
import { FormGroup, FormBuilder, FormControl, AbstractControl} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css']
})
export class AddActivityComponent implements OnInit {
  public activity: FormGroup;
  public valutas: string[] = ["EURO", "DOLLAR", "POUND"];
  public selectedValuta: string = "EURO"; 

  constructor(
    private fb: FormBuilder,
    private dataService: ActivityDataService,
    private router: Router
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
    this.dataService.addActivity$(
      this.activity.value.name,
      this.activity.value.description,
      this.valutas.indexOf(this.activity.value.valuta)
    ).subscribe()
  }

  handleCancle(){
    this.router.navigateByUrl("/profile");
  }
}
