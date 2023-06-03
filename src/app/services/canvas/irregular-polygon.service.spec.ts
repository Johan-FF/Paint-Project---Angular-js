import { TestBed } from '@angular/core/testing';

import { IrregularPolygonService } from './irregular-polygon.service';

describe('IrregularPolygonService', () => {
  let service: IrregularPolygonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IrregularPolygonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
