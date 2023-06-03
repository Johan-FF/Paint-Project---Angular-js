import { TestBed } from '@angular/core/testing';

import { RegularPolygonService } from './regular-polygon.service';

describe('RegularPolygonService', () => {
  let service: RegularPolygonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegularPolygonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
