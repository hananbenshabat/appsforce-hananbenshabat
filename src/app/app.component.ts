import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { UsersService } from './shared/services/users/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'appsforce_hananbenshabat';
  users: any = [];
  @ViewChild(MatSidenav) sideNav!: MatSidenav;

  ngOnInit(): void {
    this.usersApi.initUsers().subscribe((res: any) => {
      console.log(res.results);
      this.users = res.results;
      this.users.forEach((user) => {
        console.log(user);
      });
    });
  }
  constructor(
    private observer: BreakpointObserver,
    private cd: ChangeDetectorRef,
    private usersApi: UsersService
  ) {}
  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }
}
