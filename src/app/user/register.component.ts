import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormBuilder, Validators, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

function comparePasswords(control: AbstractControl): { [key: string]: any } {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  return password.value === confirmPassword.value
    ? null
    : { passwordsDiffer: true };
}

function serverSideValidateUsername(
  checkAvailabilityFn: (n: string) => Observable<boolean>
): ValidatorFn {
  return (control: AbstractControl): Observable<{ [key: string]: any }> => {
    return checkAvailabilityFn(control.value).pipe(
      map(available => {
        if (!available) {
          return null;
        }
        return { userAlreadyExists: true };
      })
    );
  };
}

@Component({
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  public user: FormGroup;
  public errorMsg: string;

  constructor(private authService: AuthenticationService,
    private router: Router,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.user = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [
        '',
        [Validators.required, Validators.email],
        serverSideValidateUsername(this.authService.checkUserNameAvailability)
      ],
      passwordGroup: this.fb.group(
        {
          password: ['', [Validators.required, Validators.minLength(8), Validators.pattern("^((?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])|(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^a-zA-Z0-9])|(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[^a-zA-Z0-9])|(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^a-zA-Z0-9])).{8,}$")]],
          confirmPassword: ['', Validators.required]
        },
        { validator: comparePasswords }
      )
    });
  }


  getErrorMessage(errors: any) {
    if (!errors) {
      return null;
    }
    if (errors.required) {
      return 'Is required';
    } else if (errors.minlength) {
      return `Needs at least ${
        errors.minlength.requiredLength
        } characters (got ${errors.minlength.actualLength})`;
    } else if (errors.userAlreadyExists) {
      return `User already exists`;
    } else if (errors.email) {
      return `Not a valid email address`;
    } else if (errors.passwordsDiffer) {
      return `Passwords are not the same`;
    } else if (errors.pattern){
      return `Password needs at least one capital letter and 1 digit.`;
    }
  }
  onSubmit() {

    this.authService
      .register(
        this.user.value.firstName,
        this.user.value.lastName,
        this.user.value.email,
        this.user.value.passwordGroup.password,
        this.user.value.passwordGroup.confirmPassword
      )
      .subscribe(
        val => {
          if (val) {
            this.router.navigateByUrl('/profile');
          } else {
            this.errorMsg = `Could not login`;
          }
        },
        (err: HttpErrorResponse) => {
          console.log(err);
          if (err.error instanceof Error) {
            this.errorMsg = err.error.message;
          } else {
            this.errorMsg = err.error;
          }
        }
      );
  }

  formatHttpRequestError(json_str) : string[]{
    var json = JSON.parse(json_str);
    var out : string[]= new Array(Object.keys(json).length);
  
    for (var key in json) {
      out.push(`${key}: ${json[key]}`);
   }

    console.log(out)
    return out;
  }
}