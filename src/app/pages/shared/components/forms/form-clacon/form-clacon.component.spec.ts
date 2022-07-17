import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormClaconComponent } from './form-clacon.component';

describe('FormClaconComponent', () => {
  let component: FormClaconComponent;
  let fixture: ComponentFixture<FormClaconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormClaconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormClaconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
