import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr";
import { BehaviorSubject, Observable } from 'rxjs';

export interface ChatMessage {
  timestamp: Date;
  username: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  /** message contains all past messages */
  private messages: ChatMessage[] = [];

  /** Connection is the SignalR connection to the server. */
  private connection: signalR.HubConnection;

  /** chat is an observable of chat messages */
  private chat: BehaviorSubject<ChatMessage[]>;

  public get chat$(): Observable<ChatMessage[]> {
    return this.chat.asObservable();
  }

  constructor() {
    this.connection = new signalR.HubConnectionBuilder().withUrl("/chat").build();

    this.connection.on("messageReceived", (username: string, message: string) => {
      this.messages.push({ timestamp: new Date(), username, message });
      this.chat.next(this.messages);
    });
  }

  start() {
    this.chat = new BehaviorSubject<ChatMessage[]>([]);
    if (this.connection.state !== signalR.HubConnectionState.Connected) {
      this.connection.start().then(() => console.log("SignalR Connected"));
    }
  }

  send() {
    this.connection.send("newMessage", "evan", "test message");
  }
}
