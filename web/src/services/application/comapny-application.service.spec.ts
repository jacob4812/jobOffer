import { TestBed } from '@angular/core/testing';

import { CompanyApplicationService } from './comapny-application.service';

describe('ComapnyApplicationService', () => {
  let service: CompanyApplicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyApplicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
