import { TestBed } from '@angular/core/testing';

import { LibraryService } from './library.service';
import { HttpClientModule } from '@angular/common/http';

describe('LibraryService', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [HttpClientModule] }));

  it('should be created', () => {
    const service: LibraryService = TestBed.get(LibraryService);
    expect(service).toBeTruthy();
  });
});
