import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../core/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../model/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  returnUrl: string;
  loginFormGroup: FormGroup;
  forgetEmail: string;
  hide = true;
  emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  gender: any[] = [
    { view: 'Male', value: 'male' },
    { view: 'Female', value: 'female' }
  ];
  constructor(private fBuilder: FormBuilder,
              private authService: AuthService,
              private activeRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.returnUrl = this.activeRoute.snapshot.queryParams.returnUrl || '/';
    this.loginFormGroup = this.fBuilder.group({
      username: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.pattern(this.emailregex)]],
      mobilenumber: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  onSubmit(user: User): void {
    user.created = new Date().toString();
    user.updated = new Date().toString();
    this.authService.signup(user)
      .subscribe((u: User) => {
        this.router.navigate(['/login']);
      });
  }
  getErrorPassword(): string {
    return this.loginFormGroup.get('password').hasError('required') ? 'Field is required' :
      this.loginFormGroup.get('password').hasError('pattern') ? 'Not a valid password' : '';
  }
}
