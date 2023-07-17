import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators }
from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public submitted : boolean = false;
  public noCanAccess : boolean = false;

  public form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly authService : AuthService,
    private readonly storageService : StorageService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password : ['', Validators.required],
      },
    );
  }

  public get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  public onSubmit() : void{
    this.submitted = true;
    if (this.form.invalid) return;

    this.authService.login(this.form.value)
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res?.error) {this.noCanAccess = true; return;}

          const {access_token = '', user : {email = ''}} = res;

          this.storageService.saveUser({access_token, email});

          this.router.navigate(['dashboard']);
        },
        error: ( error ) => {
          const {message, name} = error;
          console.log({
            message,
            name,
            error
          });
        }
      });
  }
}
