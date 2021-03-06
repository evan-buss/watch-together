import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
})
export class ChatComponent implements OnInit {

  message: string;

  constructor(public chatService: ChatService) { }

  ngOnInit() {
    this.chatService.start();
  }

  handleKeypress(event: KeyboardEvent) {
    // Intercept the 'Enter' key to send messages
    if (event.keyCode === 13) {
      event.preventDefault();
      this.chatService.send(this.message);
      this.message = "";
    }
  }
}
