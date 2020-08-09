import { TestBed } from '@angular/core/testing';

import { NoIdentityGuard } from './no-identity.guard';

describe('NoIdentityGuard', () => {
  let guard: NoIdentityGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NoIdentityGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
