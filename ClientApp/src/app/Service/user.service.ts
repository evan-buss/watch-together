import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { first, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../Component/notifications/notification.service';


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

  constructor(private http: HttpClient, private notifService: NotificationService) {
    if (localStorage.getItem('user') !== null) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }
  }

  setHost(username: string, password: string): void {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    this.saveToStorage();
    // TODO: Figure out how I can return from this observable HTTP request...
    this.http.post<LoginResponse>('api/login', { password }, httpOptions)
      .pipe(catchError(this.handleError))
      .subscribe(response => {
        this.user = {
          username: username,
          password: password,
          type: UserType.Host
        };
      });
    // this.notifService.addTemporary({ title: response.response, message: response.message });
    // this.notifService.addTemporary({ title: "Error", message: "Some sort of error" });
    // console.log(success);
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log(error.error.message);
    } else {
      console.log(error.status);
    }

    return throwError(error)
  }

  setViewer(username: string): void {
    this.user = {
      username: username,
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
  password?: string
  type: UserType
}

export interface LoginResponse {
  response: string
  message: string
}