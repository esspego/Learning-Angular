import { TestBed } from '@angular/core/testing';

import { PersonalvalidatorsService } from './personalvalidators.service';

describe('PersonalvalidatorsService', () => {
  let service: PersonalvalidatorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalvalidatorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
