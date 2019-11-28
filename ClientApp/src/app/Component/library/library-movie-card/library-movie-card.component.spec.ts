import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryMovieCardComponent } from './library-movie-card.component';

describe('LibraryMovieCardComponent', () => {
  let component: LibraryMovieCardComponent;
  let fixture: ComponentFixture<LibraryMovieCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibraryMovieCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibraryMovieCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
