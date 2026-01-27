import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GifCreator } from './gif-creator';

describe('GifCreator', () => {
  let component: GifCreator;
  let fixture: ComponentFixture<GifCreator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GifCreator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GifCreator);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
