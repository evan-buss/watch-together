import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieNotificationComponent } from './movie-notification.component';
import { findIndex } from 'rxjs/operators';

describe('MovieNotificationComponent', () => {
  let component: MovieNotificationComponent;
  let fixture: ComponentFixture<MovieNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MovieNotificationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieNotificationComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    // Requires @Input of type Notification
    component.notification = {
      title: "Title", message: "Message", movie: true,
      poster: "https://m.media-amazon.com/images/M/MV5BMGUwZjliMTAtNzAxZi00MWNiLWE2NzgtZGUxMGQxZjhhNDRiXkEyXkFqcGdeQXVyNjU1NzU3MzE@._V1_UX182_CR0,0,182,268_AL_.jpg"
    };
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
