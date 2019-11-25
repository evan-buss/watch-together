import { Component, OnInit, Input } from '@angular/core';
import { ChatMessage } from '../chat.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
})
export class MessageComponent implements OnInit {


  @Input() message: ChatMessage;

  constructor() { }

  ngOnInit() {
  }

}
