import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageResponseComponent } from './page-response.component';

describe('PageResponseComponent', () => {
  let component: PageResponseComponent;
  let fixture: ComponentFixture<PageResponseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageResponseComponent]
    });
    fixture = TestBed.createComponent(PageResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
