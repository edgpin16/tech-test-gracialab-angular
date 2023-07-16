import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersReservationsComponent } from './users-reservations.component';

describe('UsersReservationsComponent', () => {
  let component: UsersReservationsComponent;
  let fixture: ComponentFixture<UsersReservationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersReservationsComponent]
    });
    fixture = TestBed.createComponent(UsersReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
