import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageComponent } from './message.component';
import { UserService } from 'src/app/Service/user.service';

describe('MessageComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MessageComponent],
      providers: [UserService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.sentMessage = true;
    component.message = { timestamp: new Date(), username: "Evan Buss", message: "Hello world" };
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
