import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { AuthService } from '../core/auth.service';
import { Task } from '../model/task';
import { environment } from './../../environments/environment';
import { User } from '../model/user';

@Injectable()
export class UserService {

  api = environment.api;
  user = [];
  constructor(private http: HttpClient,
              private auth: AuthService) { }

  users(): void {
    this.http.get(`/users`).subscribe((user: []) => {
      this.user = user;
    });
  }

  get tasks(): Observable<any> {
    return this.http.get(`/tasks/${this.auth.user.id}`);
  }

  task(id): Observable<any> {
    return this.http.get(`/task/${id}`);
  }

  addNewTask(task: Task, id: number): Observable<any> {
    return this.http.post(`/add-task/${id}`, task);
  }

  updateTask(task: Task, id: number): Observable<any> {
    return this.http.put(`/update-task/${id}`, task);
  }
  deleteTask(id: string): Observable<any> {
    return this.http.delete(`/delete-task/${id}`);
  }

  assignUser(id): any {
    return this.user.filter((user: User) => user.id === id).map((user: any) => user.username);
  }

  upload(event): void {
    const file = event.target.files[0] as File;
    const reader = new FileReader();

    reader.onload = (d) => {
      const base64Img = d.target.result;
      const binaryImg = this.convertDataURIToBinary(base64Img);
      const blob = new Blob([binaryImg], {type: file.type});
      const blobURL = window.URL.createObjectURL(blob);
      console.log(blobURL);
    };

    reader.readAsDataURL(file);
  }

convertDataURIToBinary(dataURI): Uint8Array {
    const BASE64_MARKER = ';base64,';
    const base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
    const base64 = dataURI.substring(base64Index);
    const raw = window.atob(base64);
    const rawLength = raw.length;
    const array = new Uint8Array(new ArrayBuffer(rawLength));

    for (let i = 0; i < rawLength; i++) {
      array[i] = raw.charCodeAt(i);
    }
    return array;
  }
}
