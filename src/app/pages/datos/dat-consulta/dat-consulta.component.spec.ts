import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatConsultaComponent } from './dat-consulta.component';

describe('DatConsultaComponent', () => {
  let component: DatConsultaComponent;
  let fixture: ComponentFixture<DatConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatConsultaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
