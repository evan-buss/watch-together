import { Component, OnInit } from '@angular/core';
import { NotificationService, Notification } from 'src/app/Component/notifications/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styles: []
})
export class NotificationsComponent implements OnInit {

  constructor(public notificationService: NotificationService) { }

  ngOnInit() {
  }

  clearNotification(notification: Notification) {
    this.notificationService.remove(notification);
  }
}
