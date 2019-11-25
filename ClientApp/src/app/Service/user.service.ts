import { Injectable } from '@angular/core';


/**
 * UserService holds the logged-in user's information.
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: UserDetails = null;


  get loggedIn(): boolean {
    return this.user !== null;
  }

  get isHost(): boolean {
    return this.user && this.user.type === UserType.Host;
  }

  get isViewer(): boolean {
    return this.user && this.user.type === UserType.Viewer;
  }

  constructor() {
    if (localStorage.getItem('user') !== null) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }
  }

  setHost(username: string, server: string): void {
    this.user = {
      username,
      address: server,
      type: UserType.Host
    }
    this.saveToStorage();
  }

  setViewer(username: string, server: string): void {
    this.user = {
      username,
      address: server,
      type: UserType.Viewer
    }
    this.saveToStorage();
  }


  logout(): void {
    this.user = null;
    localStorage.removeItem('user');
  }

  private saveToStorage() {
    localStorage.setItem('user', JSON.stringify(this.user))
  }
}

export enum UserType {
  Host,
  Viewer
}

export interface UserDetails {
  username: string
  address: string
  type: UserType
}
