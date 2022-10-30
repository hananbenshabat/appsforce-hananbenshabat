import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/shared/interfaces/user.interface';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  @Input() set selectedUser(value: User) {
    if (value?.email) {
      this.originalEmail = value.email;
    }
    if (value?.name) {
      this.originalTitle = value.name['title'];
      this.originalFirst = value.name['first'];
      this.originalLast = value.name['last'];
    }
    if (value?.location) {
      this.originalStreet =
        value.location['street'['name']] +
        ' ' +
        value.location['street'['number']];
      this.originalCity = value.location['city'];
      this.originalCountry = value.location['country'];
    }
    this.currentUser = Object.assign({}, value);
  }
  @Output() userSaved = new EventEmitter<User>();
  @Output() userCancelled = new EventEmitter();

  originalTitle: string;
  originalFirst: string;
  originalLast: string;
  originalStreet: string;
  originalCity: string;
  originalCountry: string;
  originalEmail: string;
  currentUser: User;

  constructor() {}

  ngOnInit(): void {}

  saveUser(user: User) {
    this.userSaved.emit(user);
  }

  cancelUser() {
    this.userCancelled.emit();
  }
}
