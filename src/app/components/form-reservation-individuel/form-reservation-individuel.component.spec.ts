import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormReservationIndividuelComponent } from './form-reservation-individuel.component';

describe('FormReservationIndividuelComponent', () => {
  let component: FormReservationIndividuelComponent;
  let fixture: ComponentFixture<FormReservationIndividuelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormReservationIndividuelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormReservationIndividuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
