import { TestBed } from '@angular/core/testing';

import { ApplicationFormService } from './form.service';

describe('FormService', () => {
  let service: ApplicationFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
