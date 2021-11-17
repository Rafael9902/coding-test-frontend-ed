import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import { AuthService} from "../../../auth/auth.service";
import { Router } from '@angular/router';
import * as utils  from "../../../shared/utils";
import {window} from "rxjs";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  register: boolean = false;
  loginMessage: string = "";

  credentialsForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private _authService: AuthService, private _router: Router) {}

  ngOnInit(): void {
    if(this._authService.isLoggedIn())
      this._router.navigate(["/home"]);

    this.validateRegisterUser()
  }

  validateRegisterUser(){
    if(utils.getLocalValue("register")){
      this.register = true;
      utils.clearLocalStorage();
    }
  }

  onSubmit(){
    this._authService.login(this.credentialsForm.value).subscribe(
      response =>{
        console.log(response);
        if(response.status == 200){
          utils.saveSessionToken(response.token);
          utils.saveLocalValue("login", "true");
        }
        else
          this.loginMessage = response.message;
          this.register = false;
      },
      error =>{
        console.error(error);
      }
    )
    setTimeout(()=> this.ngOnInit(), 500)
  }

}
