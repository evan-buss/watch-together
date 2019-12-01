import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieComponent } from './movie.component';
import { ChatComponent } from 'src/app/Component/chat/chat.component';
import { VideoPlayerComponent } from 'src/app/Component/video-player/video-player.component';
import { MessageComponent } from 'src/app/Component/chat/message/message.component';
import { FormsModule } from '@angular/forms';

describe('MovieComponent', () => {
  let component: MovieComponent;
  let fixture: ComponentFixture<MovieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [MovieComponent, ChatComponent, VideoPlayerComponent, MessageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
