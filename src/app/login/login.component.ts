import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../core/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  returnUrl: string;
  loginFormGroup: FormGroup;
  forgetEmail: string;
  // flag = true;
  hide = true;
  emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  constructor(private fBuilder: FormBuilder,
              private authService: AuthService,
              private activeRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.returnUrl = this.activeRoute.snapshot.queryParams.returnUrl || '/';
    this.loginFormGroup = this.fBuilder.group({
      email: [null, [Validators.required, Validators.pattern(this.emailregex)]],
      password: [null, [Validators.required]]
    });
  }

  getErrorPassword(): string {
    return this.loginFormGroup.get('password').hasError('required') ? 'Field is required' :
      this.loginFormGroup.get('password').hasError('pattern') ? 'Not a valid password' : '';
  }

  onSubmit(data): void {
    this.authService.login(data)
    .subscribe((d: any) => {
      localStorage.setItem('token', d.token);
      this.authService.getUser();
      this.router.navigate([this.returnUrl]);
    }, err => console.log(err));
  }

}
