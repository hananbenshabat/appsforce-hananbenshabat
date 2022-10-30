import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { User } from '../shared/interfaces/user.interface';
import { UsersService } from '../shared/services/users/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users$: Observable<User[]>;
  selectedUser: User;
  isInitialized: boolean = false;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.loadUsers(true);
    this.resetUser();
  }

  selectUser(user: User) {
    this.selectedUser = user;
  }

  loadUsers(displayNotification: boolean) {
    this.users$ = this.usersService.getAllUsers(displayNotification);
  }

  saveUser(user: User) {
    if (user.login['uuid']) {
      this.updateUser(user);
    } else {
      this.createUser(user);
    }
    this.resetUser();
  }

  updateUser(user: User) {
    this.usersService
      .updateUser(user)
      .pipe(tap(() => this.loadUsers(false)))
      .subscribe();
  }

  createUser(user: User) {
    this.usersService
      .createUser(user)
      .pipe(tap(() => this.loadUsers(false)))
      .subscribe();
  }

  deleteUser(email: string) {
    this.usersService
      .deleteUser(email)
      .pipe(tap(() => this.loadUsers(false)))
      .subscribe();
  }

  resetUser() {
    const emptyUser: User = {
      gender: '',
      name: [{ title: '', first: '', last: '' }],
      email: '',
      location: [
        {
          street: [{ number: 0, name: '' }],
          city: '',
          state: '',
          country: '',
          postcode: '',
          coordinates: [{ latitude: 0, longitude: 0 }],
          timezone: [{ offset: '', description: '' }],
        },
      ],
      login: [
        {
          uuid: '',
          username: '',
          password: '',
          salt: '',
          md5: '',
          sha1: '',
          sha256: '',
        },
      ],
      dob: [{ date: undefined, age: 0 }],
      registered: [{ date: undefined, age: 0 }],
      phone: '',
      cell: '',
      id: [{ name: '', value: '' }],
      picture: [{ large: '', medium: '', thumbnail: '' }],
      nat: '',
    };

    this.selectUser(emptyUser);
  }
}
