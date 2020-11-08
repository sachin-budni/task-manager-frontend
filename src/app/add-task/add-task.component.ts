import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { UserService } from '../service/user.service';
import { Task } from '../model/task';
import { AuthService } from '../core/auth.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  taskFormGroup: FormGroup;

  currentYear = new Date().getFullYear();
  currentDate = new Date().getDate();
  currentMonth = new Date().getMonth();
  startMinDate = new Date(this.currentYear - 0, this.currentMonth, this.currentDate);
  endMinDate = new Date(this.currentYear - 0, this.currentMonth, this.currentDate);
  updateFlag = false;
  updateTaskData: Task;
  constructor(private fb: FormBuilder, public user: UserService,
              private auth: AuthService, private route: ActivatedRoute,
              private snack: MatSnackBar, private router: Router) {
    if ((this.user.user.length === 0)) {
      this.user.users();
    }

    const id = this.route.snapshot.params.id;
    if (id) {
      this.updateFlag = true;
      this.user.task(id).subscribe((task: Task) => {
        this.startMinDate = new Date(task.start);
        this.endMinDate = new Date(task.end);
        this.updateTaskData = task;
        this.getController('name').setValue(task.name);
        this.getController('description').setValue(task.description);
        this.getController('start').setValue(new Date(task.start));
        this.getController('end').setValue(new Date(task.end));
        this.getController('assignto').setValue(task.assignto);
      });
    }
  }

  ngOnInit(): void {
    this.taskFormGroup = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      start: ['', [Validators.required, Validators.minLength(3)]],
      end: ['', [Validators.required, Validators.minLength(3)]],
      assignto: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  getController(name: string): AbstractControl {
    return this.taskFormGroup.get(name);
  }

  get getFormGroup(): AbstractControl{
    return this.taskFormGroup.get('end');
  }

onSubmit(task: Task): any {
    task.start = task.start.toString();
    task.end = task.end.toString();
    task.updated = new Date().toString();
    if (!this.updateFlag) {
      task.created = new Date().toString();
      this.user.addNewTask(task, this.auth.user.id).subscribe((task1: any) => {
        this.snack.open('Task added Successfully', 'close');
        this.router.navigate(['tasks']);
      });
    } else {
      task.created = this.updateTaskData.created;
      task.id = this.updateTaskData.id;
      this.user.updateTask(task, this.auth.user.id).subscribe((task1: any) => {
        this.snack.open('Task updated Successfully', 'close');
        this.router.navigate(['tasks']);
      });
    }
  }

addEvent(event: MatDatepickerInputEvent<Date>): void {
    const currentYear = event.value.getFullYear();
    const currentMonth = event.value.getMonth();
    const currentDate = event.value.getDate();
    this.endMinDate = new Date(currentYear - 0, currentMonth, currentDate);
    this.getFormGroup.setValue('');
  }
}
