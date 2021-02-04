import { TestBed } from '@angular/core/testing';

import { AuthorexistsGuard } from './authorexists.guard';

describe('AuthorexistsGuard', () => {
  let guard: AuthorexistsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthorexistsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
