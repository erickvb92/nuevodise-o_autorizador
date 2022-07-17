import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MttoAnualComponent } from './mtto-anual.component';

describe('MttoAnualComponent', () => {
  let component: MttoAnualComponent;
  let fixture: ComponentFixture<MttoAnualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MttoAnualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MttoAnualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
