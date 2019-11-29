import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieNotificationComponent } from './movie-notification.component';

describe('MovieNotificationComponent', () => {
  let component: MovieNotificationComponent;
  let fixture: ComponentFixture<MovieNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
