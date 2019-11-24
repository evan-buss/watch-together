import { Component } from '@angular/core';
import { NotificationService, Notification } from 'src/app/Components/notifications/notification.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
})
export class NavMenuComponent {
  isExpanded = false;

  constructor(private notifications: NotificationService) { }

  collapse() {
    this.isExpanded = false;
  }

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

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
