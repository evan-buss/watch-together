import { Component, Output } from '@angular/core';
import { UserService } from 'src/app/Service/user.service';
import { Router } from '@angular/router';
import { ChatService } from '../chat/chat.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styles: [`.active {
    background-color: white;
    color: #4299e1;
  }`]
})
export class NavMenuComponent {
  constructor(
    public userService: UserService,
    public router: Router,
    public chatService: ChatService) { }
}
