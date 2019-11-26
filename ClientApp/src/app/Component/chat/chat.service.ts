import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr";
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from 'src/app/Service/user.service';

/** ChatMessage holds message information from a user */
export interface ChatMessage {
  timestamp: Date;
  username: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  chatVisible: boolean = true;

  /** message contains all past messages */
  private messages: ChatMessage[] = [];

  /** Connection is the SignalR connection to the server. */
  private connection: signalR.HubConnection;

  /** chat is an observable of chat messages */
  private chat: BehaviorSubject<ChatMessage[]>;

  public get chat$(): Observable<ChatMessage[]> {
    return this.chat.asObservable();
  }

  constructor(private userService: UserService) {
    this.connection = new signalR.HubConnectionBuilder().withUrl("/chat").build();

    this.connection.on("broadcastMessage", (chatMessage: ChatMessage) => {
      this.messages.push(chatMessage);
      this.chat.next(this.messages);
    });
  }

  start() {
    this.chat = new BehaviorSubject<ChatMessage[]>([]);
    if (this.connection.state !== signalR.HubConnectionState.Connected) {
      this.connection.start().then(() => console.log("SignalR Connected"));
    }
  }

  send(message: string) {
    let chatMessage = <ChatMessage>{
      timestamp: new Date(),
      username: this.userService.user.username,
      message: message
    };

    this.connection.send("sendMessage", chatMessage);
  }

  toggleChat(): void {
    console.log("toggle chat");
    this.chatVisible = !this.chatVisible;
  }
}
