import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentUser: Observable<any>;
  constructor(public auth: AuthService,
              public userService: UserService,
              private router: Router) {
    if (!this.auth.user) {
      this.auth.getUser();
    }
  }

  ngOnInit(): void {
  }

  remove(): void {
    localStorage.removeItem('token');
    this.auth.user = undefined;
    this.userService.user = undefined;
    this.router.navigate(['']);
    this.auth.logout
    .subscribe((u: any) => {
      console.log(u);
    });
  }

  get $user(): User {
    return this.auth.user;
  }

  get $admin(): boolean {
    return this.auth.admin;
  }
}
