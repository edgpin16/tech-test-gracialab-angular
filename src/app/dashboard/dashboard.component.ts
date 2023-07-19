import { Component, OnInit } from '@angular/core';

import { DashboardService } from '../services/dashboard.service';
import { UserReservation } from '../models/user-reservation.model';
import { AuthService } from '../services/auth.service';

import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators }
from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  public visible: boolean = false;
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
    idReservation : new FormControl('')
  });

  public reservations? : any = [];
  public editReservation? : any = {}

  constructor(
    private readonly dashboardService : DashboardService,
    private readonly formBuilder: FormBuilder,
    private readonly authService : AuthService
  ){}

  ngOnInit(): void {
    this.dashboardService.getAll()
    .subscribe({
      next: (res) => {
        console.log(res);
        this.reservations = res;
        console.log(this.reservations);
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
        observation: ['', [Validators.required]],
        idReservation : ['', [Validators.required]],
      },
    );
  }

  public get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  public showDialog(data : any) {
    this.visible = true;
    this.editReservation = data;
    console.log(data);
    this.form.patchValue({
      description : this.editReservation?.description,
      idReservation : this.editReservation?.id,
      observation : this.editReservation?.observation,
      people_quantity : this.editReservation?.people_quantity,
      reservation_date : this.editReservation?.reservation_date,
      reservation_type : this.editReservation?.reservation_type,
      email : this.editReservation?.user.email,
      identificacion_document : this.editReservation.user?.identificacion_document,
      last_name : this.editReservation.user?.last_name,
      name: this.editReservation.user?.name,
      type_document : this.editReservation.user?.type_document,
    })
  }

  public onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) return;

    this.saveEditData(this.form.value)
  }

  public onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  private async saveEditData(data : UserReservation) : Promise<void> {
    this.dashboardService.edit(data)
    .subscribe({
      next: (res) => {
        console.log(res);
        location.reload()
      },
      error: ({ error }) => {
        console.log(error);
      }
    });
  }

  public onclickConfirmReservation(idReservation : number = 0) : void {
    this.dashboardService.confirmReservation(idReservation)
    .subscribe({
      next: (res) => {
        console.log(res);
        location.reload()
      },
      error: ({ error }) => {
        console.log(error);
      }
    });
  }

  public logout() : any{
    this.authService.logout();
  }
}
