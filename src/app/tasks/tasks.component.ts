import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Observable } from 'rxjs';
import { Task } from './../model/task';
import { User } from '../model/user';
import { AuthService } from '../core/auth.service';
import { Role } from '../model/role';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  users: Observable<any>;
  usersData: User[];
  tasks: Observable<any>;
  displayedColumns = ['name', 'description', 'start', 'end', 'assignto'];
  constructor(private user: UserService, private auth: AuthService) { }

  ngOnInit(): void {
    if ((this.user.user.length === 0)) {
      this.user.users();
    }
    if (this.auth.user === null) {
      this.auth.getUser();
    }
    this.tasks = this.user.tasks;
    this.displayColumn(this.auth.user);
  }

  displayColumn(user: User): void{
    const editor = user.roles.filter((role: Role) => role.name === 'EDITOR').map((role: Role) => role.name === 'EDITOR');
    const admin = user.roles.filter((role: Role) => role.name === 'ADMIN').map((role: Role) => role.name === 'ADMIN');
    if (editor[0]) {
      this.displayedColumns.push('edit');
    }
    if (admin[0]) {
      this.displayedColumns.push('delete');
    }
  }

  deleteTask(id): void {
    this.user.deleteTask(id)
    .subscribe((d: any) => {
      this.tasks = this.user.tasks;
    });
  }
}
