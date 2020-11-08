import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HeaderComponent } from './header/header.component';
import { TaskComponent } from './task/task.component';
import { TasksComponent } from './tasks/tasks.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptor } from './core/api.interceptor';
import { AuthService } from './core/auth.service';
import { AuthGuard } from './core/auth.guard';
import { UserService } from './service/user.service';
import { AddTaskComponent } from './add-task/add-task.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminGuard } from './core/admin.guard';
import { EditorGuard } from './core/editor.guard';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminService } from './admin.service';
import { AssigntoPipe } from './pipes/assignto.pipe';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    TaskComponent,
    TasksComponent,
    AddTaskComponent,
    ProfileComponent,
    AdminPanelComponent,
    AssigntoPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
    AuthGuard,
    UserService,
    EditorGuard,
    AdminGuard,
    AdminService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
