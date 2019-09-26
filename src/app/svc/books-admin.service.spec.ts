import { TestBed } from '@angular/core/testing';

import { BooksAdminService } from './books-admin.service';

describe('BooksAdminService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BooksAdminService = TestBed.get(BooksAdminService);
    expect(service).toBeTruthy();
  });
});
