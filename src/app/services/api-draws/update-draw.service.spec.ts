import { TestBed } from '@angular/core/testing';

import { UpdateDrawService } from './update-draw.service';

describe('UpdateDrawService', () => {
  let service: UpdateDrawService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateDrawService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
