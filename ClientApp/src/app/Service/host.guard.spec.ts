import { TestBed, inject } from '@angular/core/testing';

import { HostGuard } from './host.guard';
import { UserService } from './user.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('HostGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [HostGuard, UserService]
    });
  });

  it('should ...', inject([HostGuard], (guard: HostGuard) => {
    expect(guard).toBeTruthy();
  }));
});
