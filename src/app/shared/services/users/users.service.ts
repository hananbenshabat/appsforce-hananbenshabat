import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../../interfaces/user.interface';
import { NotificationService } from '../notifications/notification.service';

const BASE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  api_key = 'https://randomuser.me/api/?results=10';

  model = 'results';

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) {}

  getAllUsers(displayNotification: boolean) {
    if (displayNotification) {
      this.notificationService.notify('Get All User HTTP Call');
    }

    return this.http.get<User[]>(this.getUrl());
  }

  createUser(user: User) {
    this.notificationService.notify('Create User HTTP Call');
    return this.http.post<User>(this.getUrl(), user);
  }

  updateUser(user: User) {
    this.notificationService.notify('Update User HTTP Call');
    return this.http.put<User>(this.getUrlWithEmail(user.email), user);
  }

  deleteUser(email: string) {
    this.notificationService.notify('Delete User HTTP Call');
    return this.http.delete(this.getUrlWithEmail(email));
  }

  initUsers() {
    return this.http.get(this.api_key);
  }

  private getUrl() {
    return `${BASE_URL}/${this.model}`;
  }

  private getUrlWithEmail(email: string) {
    return `${this.getUrl()}?email=${email}`;
  }
}
