import { TestBed } from '@angular/core/testing';

import { Gifs } from './gifs';

describe('Gifs', () => {
  let service: Gifs;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Gifs);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
