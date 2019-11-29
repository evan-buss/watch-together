import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Notification } from '../notification.service';

@Component({
  selector: 'app-default-notification',
  template: `
    <div class="relative rounded shadow-lg w-full max-w-sm bg-white p-2 mb-2">
      <div class="flex flex-row w-full justify-between">
        <h1 class="font-bold text-blue-600 truncate">{{notification.title}}</h1>
        <i (click)="close.emit(null)" class="absolute right-0 top-0 mt-1 mr-1 la la-times-circle text-2xl
          text-red-500 hover:text-red-300 cursor-pointer"></i>
      </div>
      <span class="text-gray-600 break-words">{{notification.message}}</span>
    </div>`
})
export class DefaultNotificationComponent implements OnInit {
  @Input() notification: Notification
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

}
