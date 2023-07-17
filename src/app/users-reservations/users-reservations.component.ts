import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators }
from '@angular/forms';

import { UserReservationService } from '../services/user-reservation.service';
import { UserReservation } from '../models/user-reservation.model';

@Component({
  selector: 'app-users-reservations',
  templateUrl: './users-reservations.component.html',
  styleUrls: ['./users-reservations.component.css']
})
export class UsersReservationsComponent implements OnInit{

  public submitted : boolean = false;

  public form: FormGroup = new FormGroup({
    identificacion_document: new FormControl(''),
    name: new FormControl(''),
    last_name: new FormControl(''),
    type_document: new FormControl(''),
    email: new FormControl(''),
    reservation_date: new FormControl(''),
    reservation_type: new FormControl(''),
    people_quantity: new FormControl(''),
    description: new FormControl(''),
    observation: new FormControl(''),
  });

  constructor(
    private formBuilder: FormBuilder,
    private readonly userReservationService : UserReservationService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        identificacion_document : ['', Validators.required],
        name : ['', Validators.required],
        last_name : ['', Validators.required],
        type_document : ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        reservation_date: ['', [Validators.required]],
        reservation_type: ['', [Validators.required]],
        people_quantity: ['', [Validators.required]],
        description: ['', [Validators.required]],
        observation: ['', [Validators.required]]
      },
    );
  }

  public get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  public onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) return;

      console.log("DESDE EL SUBMIT");
      console.log(JSON.stringify(this.form.value, null, 2));

    this.saveUserReservation(this.form.value);
  }

  public onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  private async saveUserReservation( userReservation : UserReservation ) : Promise<void> {
    const res = await this.userReservationService.create(userReservation)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['users-reservations/response'], { state : {response : res} });
        },
        error: ({ error }) => {
          console.log(error);
          this.router.navigate(['users-reservations/response'], { state : {response : error} });
        }
      });
  }
}
