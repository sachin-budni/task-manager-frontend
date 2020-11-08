import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminService } from './../admin.service';
import { Role } from '../model/role';
import { FormControl } from '@angular/forms';
import { User } from '../model/user';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
  rolevalues: any;
  roles: [] = [];
  $user: Observable<any>;
  $roles: Observable<any>;
  selectedRoles = new FormControl();
  constructor(private admin: AdminService) { }

  ngOnInit(): void {
    this.$user = this.admin.users;
    this.$roles = this.admin.roles;
    this.$roles.subscribe(roles => {
      this.roles = roles;
    });
  }

  getRoles(role: Role[]): number[] {
    return role.map(r => r.id);
  }

  onChange(event, user: User): any {
    const value: number[] = event.value;
    if (value.includes(2) && !value.includes(3)) {
      value.push(3);
    }
    user.roles = this.roles.filter((role: Role) => value.includes(role.id));
  }

  submit(user: User): void {
    console.log(user);
    this.admin.roleUpdate(user).subscribe((u: User) => {
      console.log(u);
    });
  }
}
