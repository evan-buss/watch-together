import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatComponent } from './chat.component';
import { MessageComponent } from './message/message.component';
import { FormsModule } from '@angular/forms';
import { ChatService } from './chat.service';
import * as signalR from "@microsoft/signalr";

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ChatComponent, MessageComponent],
      providers: [ChatService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.chatService.start();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
