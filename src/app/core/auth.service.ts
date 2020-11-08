import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { User } from './../model/user';
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  private api = environment.api;
  constructor(private http: HttpClient, private router: Router) { }
  user: User;
  allUser: [];
  public get getToken(): string {
    return localStorage.getItem('token');
  }

  getUser(): void{
    if (this.getToken) {
      this.currentUser.subscribe((user: User) => {
        this.user = user;
      }, err => {
        if (!err.ok) { localStorage.removeItem('token'); }
      });
    }
  }

  get admin(): boolean {
    for (const role of this.user.roles) {
      if (role.name === 'ADMIN') {
        return true;
      }
    }
    return false;
  }

  get currentUser(): Observable<any>{
    return this.http.get(`/current/${this.getToken}`);
  }

  get logout(): Observable<any> {
    return this.http.get(`/logout`);
  }

  signup(user: User): Observable<any> {
    return this.http.post(`/register`, user);
  }

  login(data): any {
    return this.http.post(`/login`, data);
  }

  updateUser(user: User): Observable<any> {
    return this.http.post(`/user/${user.id}`, user);
  }

  upload(uploadImageData): void {
    this.http.put(`/uploadFile/${this.user.id}`, uploadImageData, { headers: { Auth: '' } })
      .subscribe((response: any) => {
        this.user.profilepic = response.fileDownloadUri;
      }, (err) => err.error.text);

  }

  get canRead(): Promise<boolean> {
    const allowed = 'USER';
    return new Promise((res, rej) => {
        if (this.user) {
          res(this.checkAuthorization(this.user, allowed));
        } else {
          this.currentUser
          .subscribe((user: User) => {
            this.user = user;
            res(this.checkAuthorization(this.user, allowed));
          }, (err: any) => {
            if (!err.ok) { localStorage.removeItem('token'); }
            return rej(false);
          });
        }
      });
  }

  get canEdit(): Promise<boolean> {
    const allowed = 'EDITOR';
    return new Promise((res, rej) => {
      if (this.user) {
        res(this.checkAuthorization(this.user, allowed));
      } else {
        this.currentUser
        .subscribe((user: User) => {
          this.user = user;
          res(this.checkAuthorization(this.user, allowed));
        }, (err: any) => {
          if (!err.ok) { localStorage.removeItem('token'); }
          this.router.navigate(['']);
          return rej(false);
        });
      }
    });
  }

  get canDelete(): Promise<boolean> {
    const allowed = 'ADMIN';
    return new Promise((res, rej) => {
      if (this.user) {
        res(this.checkAuthorization(this.user, allowed));
      } else {
        this.currentUser
        .subscribe((user: User) => {
          this.user = user;
          res(this.checkAuthorization(this.user, allowed));
        }, (err: any) => {
          if (!err.ok) { localStorage.removeItem('token'); }
          this.router.navigate(['']);
          return rej(false);
        });
      }
    });
  }

  private checkAuthorization(user: any, allowedRoles: string): boolean {
    if (!user) { return false; }
    for (const role of user.roles) {
      if ( role.name === allowedRoles ) {
        return true;
      }
    }
    this.router.navigate(['']);
    return false;
  }


}
