import { TestBed } from '@angular/core/testing';

import { MensualService } from './mensual.service';

describe('MensualService', () => {
  let service: MensualService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MensualService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
