import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersService } from '../shared/services/users/users.service';

import { UsersComponent } from './users.component';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UsersComponent],
      providers: [
        {
          provide: UsersService,
          useValue: jasmine.createSpyObj('UsersService', [
            'getAllUsers',
            'updateUser',
            'createUser',
            'deleteUser',
          ]),
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
