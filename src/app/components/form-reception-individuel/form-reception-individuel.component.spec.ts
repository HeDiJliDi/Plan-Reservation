import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormReceptionIndividuelComponent } from './form-reception-individuel.component';

describe('FormReceptionIndividuelComponent', () => {
  let component: FormReceptionIndividuelComponent;
  let fixture: ComponentFixture<FormReceptionIndividuelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormReceptionIndividuelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormReceptionIndividuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
