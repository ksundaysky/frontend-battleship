import { TestBed } from '@angular/core/testing';

import { RandomShipsService } from './random-ships.service';

describe('RandomShipsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RandomShipsService = TestBed.get(RandomShipsService);
    expect(service).toBeTruthy();
  });
});
