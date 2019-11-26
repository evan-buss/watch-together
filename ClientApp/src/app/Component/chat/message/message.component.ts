import { Component, OnInit, Input } from '@angular/core';
import { ChatMessage } from '../chat.service';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
})
export class MessageComponent implements OnInit {

  // Did logged in user send it?
  sentMessage: boolean;
  @Input() message: ChatMessage;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.sentMessage = this.message.username === this.userService.user.username;
  }
}
