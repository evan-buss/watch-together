import { Component, Input } from '@angular/core';
import { ChatMessage } from '../chat.service';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
})
export class MessageComponent {

  // Did logged in user send it?
  sentMessage: boolean = false;
  @Input() message: ChatMessage = null;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.sentMessage = this.message !== null && this.userService.user !== null && this.message.username === this.userService.user.username;
  }
}
