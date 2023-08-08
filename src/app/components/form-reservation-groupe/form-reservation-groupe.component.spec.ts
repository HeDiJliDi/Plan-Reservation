import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormReservationGroupeComponent } from './form-reservation-groupe.component';

describe('FormReservationGroupeComponent', () => {
  let component: FormReservationGroupeComponent;
  let fixture: ComponentFixture<FormReservationGroupeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormReservationGroupeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormReservationGroupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
