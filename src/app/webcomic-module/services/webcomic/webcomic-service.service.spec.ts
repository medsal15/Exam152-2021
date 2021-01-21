import { TestBed } from '@angular/core/testing';

import { WebcomicService } from './webcomic-service.service';

describe('WebcomicServiceService', () => {
  let service: WebcomicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebcomicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
