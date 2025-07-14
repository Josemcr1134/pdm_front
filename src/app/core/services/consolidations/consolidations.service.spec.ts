import { TestBed } from '@angular/core/testing';

import { ConsolidationsService } from './consolidations.service';

describe('ConsolidationsService', () => {
  let service: ConsolidationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsolidationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
