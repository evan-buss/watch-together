import { Component, Output } from '@angular/core';
import { NotificationService, Notification } from 'src/app/Component/notifications/notification.service';
import { UserService } from 'src/app/Service/user.service';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { ChatService } from '../chat/chat.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
})
export class NavMenuComponent {
  constructor(private notifications: NotificationService,
    public userService: UserService,
    public router: Router,
    public chatService: ChatService) { }

  tempNotif(): void {
    this.notifications.addTemporary({
      title: "Temporary",
      message: "This is the body"
    } as Notification);
  }

  persNotif(): void {
    this.notifications.addPersistant({
      title: "Persistant",
      message: "This is the body"
    } as Notification);
  }
}
