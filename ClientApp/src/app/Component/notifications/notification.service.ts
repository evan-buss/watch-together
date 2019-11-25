import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor() { }

  notifications: Notification[] = [];

  addTemporary(notification: Notification): void {
    notification = { ...notification, ...{ time: Date.now() } }
    this.notifications.push(notification);
    setTimeout(() => {
      this.notifications = this.notifications.filter(notif => notif.time !== notification.time)
    }, 4000)
  }

  addPersistant(notification: Notification): void {
    this.notifications.push({ ...notification, ...{ time: Date.now() } });
  }

  remove(notification: Notification): void {
    this.notifications = this.notifications.filter(notif => notif.time !== notification.time)
  }
}

/**
 * Notification is shown across multiple user's screen
 */
export interface Notification {
  time?: number;
  title: string;
  message: string;
  movie?: boolean;
}
