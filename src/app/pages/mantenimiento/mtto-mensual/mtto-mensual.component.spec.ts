import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MttoMensualComponent } from './mtto-mensual.component';

describe('MttoMensualComponent', () => {
  let component: MttoMensualComponent;
  let fixture: ComponentFixture<MttoMensualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MttoMensualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MttoMensualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
