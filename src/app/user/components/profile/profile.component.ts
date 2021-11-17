import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { UserService } from "../../services/user.service";
import * as utils  from "../../../shared/utils";
import { User } from "../../../models/user";
import {AuthService} from "../../../auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  updateMessage: string = "";
  user: User;

  userForm = new FormGroup({
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private _userService: UserService, private _authService: AuthService, private _router: Router) {
    this.user = new User(0, "", "", "", "");
  }

  ngOnInit(): void {
    if(!this._authService.isLoggedIn())
      this._router.navigate(["/login"]);

    this.getUserData();
  }

  getUserData(){
    let token = utils.getUserSession();

    this._userService.get(token).subscribe(
      response =>{
        this.user = new User(response.id, response.first_name, response.last_name, response.email, "d");
        this.updateForm()
      },
      error =>{
        console.error(error);
        utils.clearSessionToken();
        this.ngOnInit()
      }
    )
  }

  updateForm(){
    this.userForm.setValue({
      first_name: this.user.first_name,
      last_name: this.user.last_name,
      email: this.user.email,
      password: ''
    });
  }

  onSubmit(){
    this.userForm.value.id = this.user.id;
    this._userService.update(this.userForm.value).subscribe(
      response =>{
        this.updateMessage = response.message
      },
      error =>{
        console.error(error);
      }
    )

  }

}
