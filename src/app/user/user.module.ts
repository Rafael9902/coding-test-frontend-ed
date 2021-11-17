import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { UserRoutingModule} from "./user.routes";
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from '@angular/router';
import {UserService} from "./services/user.service";
import { ProfileComponent } from './components/profile/profile.component'
import { ComicModule } from "../comic/comic.module";

@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    ProfileComponent
  ],
  exports: [
    HomeComponent,
    UserRoutingModule
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    ComicModule
  ],
  providers: [UserService]
})
export class UserModule { }
