import { Component, OnInit } from '@angular/core';
import { FriendRequestDataService } from '../friend-request-data.service';
import { AuthenticationService } from 'src/app/user/authentication.service';
import { Observable } from 'rxjs';
import { ValidatorFn, AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

function serverSideValidateUsername(
  checkAvailabilityFn: (n: string) => Observable<boolean>
): ValidatorFn {
  return (control: AbstractControl): Observable<{ [key: string]: any }> => {
    return checkAvailabilityFn(control.value).pipe(
      map(available => {
        if (available) {
          return null;
        }
        return { userDoesNotExists: true };
      })
    );
  };
}

@Component({
  //selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.css']
})
export class AddFriendComponent implements OnInit {
  //public succes : boolean;
  public friend: FormGroup;
  public errorMsg: string;
  public succesMsg: string;
  constructor( 
    private dataService : FriendRequestDataService, 
    private userDataService : AuthenticationService,
    private router : Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.friend = this.fb.group({
      email: [
        '',
        [Validators.email],
        serverSideValidateUsername(this.userDataService.checkUserNameAvailability)
      ]
    });
  }

  onSubmit() {
    this.succesMsg = null;
    this.dataService
      .sendFriendRequest$(this.friend.value.email)
      .subscribe(
        () => {
          this.succesMsg = "Friend request has been sent!"
        },
        (err: HttpErrorResponse) => {
          //console.log(err);
          if (err.error instanceof Error) {
            this.errorMsg = err.error.message;
          } else {
            this.errorMsg = err.error;
          }
        }
      );
  }

  cancel() : void{
    this.router.navigate(['profile']);
  }

  getErrorMessage(errors: any) {
    if (!errors) {
      return null;
    }

    if (errors.userDoesNotExists) {
      return `This email address is not known`;
    } else if (errors.email) {
      return `Not a valid email address`;
    }
  }


}
