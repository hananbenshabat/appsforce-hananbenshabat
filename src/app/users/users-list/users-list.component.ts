import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/shared/interfaces/user.interface';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  @Input() users: User[] = [];
  @Output() userSelected = new EventEmitter<User>();
  @Output() userDeleted = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  selectUser(user: User) {
    this.userSelected.emit(user);
  }

  deleteUser(email: string) {
    this.userDeleted.emit(email);
  }
}
