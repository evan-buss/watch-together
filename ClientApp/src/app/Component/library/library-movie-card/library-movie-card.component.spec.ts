import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryMovieCardComponent } from './library-movie-card.component';

describe('LibraryMovieCardComponent', () => {
  let component: LibraryMovieCardComponent;
  let fixture: ComponentFixture<LibraryMovieCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LibraryMovieCardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibraryMovieCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.movie = {
      id: 0,
      path: '/home/evan/Videos/Treasure Planet/Treasure Planet (2002).mkv',
      modified: false,
      metadata: {
        id: 0,
        url: 'https://imdb.com/title/tt0133240',
        poster: 'https://m.media-amazon.com/images/M/MV5BNGI0N2EzZDktNDY3OS00NWFmLTgxZjEtMTc1OTNlMzQxNDZkXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_UX182_CR0,0,182,268_AL_.jpg',
        rating: '7.2',
        summary: 'A Disney animated version of "Treasure Island". The only difference is that the film is set in outer space with alien worlds and other galactic wonders.',
        title: 'Treasure Planet',
        year: '2002'
      }
    }
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
