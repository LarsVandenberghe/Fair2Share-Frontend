import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { HttpErrorResponse } from '@angular/common/http';

function comparePasswords(control: AbstractControl): { [key: string]: any } {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password.value === confirmPassword.value
        ? null
        : { passwordsDiffer: true };
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
                [Validators.required, Validators.email]
                //serverSideValidateUsername(this.authService.checkUserNameAvailability)
            ],
            passwordGroup: this.fb.group(
                {
                    password: ['', [Validators.required, Validators.minLength(8)]],
                    confirmPassword: ['', Validators.required]
                },
                { validator: comparePasswords }
            )
        });
    }

    onSubmit() {

        this.authService
          .register(
            this.user.value.firstName,
            this.user.value.lastName,
            this.user.value.email,
            this.user.value.passwordGroup.password
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
                this.errorMsg = `Error while trying to login user ${
                  this.user.value.email
                }: ${err.error.message}`;
              } else {
                this.errorMsg = `Error ${err.status} while trying to login user ${
                  this.user.value.email
                }: ${err.error}`;
              }
            }
          );
    }
}