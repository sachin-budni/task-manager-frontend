import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './model/user';

@Injectable()
export class AdminService {

  api = environment.api;
  constructor(private http: HttpClient) { }

  get users(): Observable<any> {
    return this.http.get(`/user`);
  }

  get roles(): Observable<any> {
    return this.http.get(`/roles`);
  }

  roleUpdate(user: User): Observable<any> {
    return this.http.put(`/user/${user.id}`, user);
  }
}
