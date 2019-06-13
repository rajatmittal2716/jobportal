import { TestBed } from '@angular/core/testing';

import { SeekerdataService } from './seekerdata.service';

describe('SeekerdataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SeekerdataService = TestBed.get(SeekerdataService);
    expect(service).toBeTruthy();
  });
});
