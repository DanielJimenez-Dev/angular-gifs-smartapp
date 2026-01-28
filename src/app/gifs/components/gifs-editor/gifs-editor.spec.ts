import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GifsEditor } from './gifs-editor';

describe('GifsEditor', () => {
  let component: GifsEditor;
  let fixture: ComponentFixture<GifsEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GifsEditor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GifsEditor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
