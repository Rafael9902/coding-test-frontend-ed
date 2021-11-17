import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { AuthService} from "../../../auth/auth.service";
import { Router } from "@angular/router";
import { UserService } from "../../services/user.service";
import * as utils  from "../../../shared/utils";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerMessage: string = "";

  registerForm = new FormGroup({
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });


  constructor(private _authService: AuthService, private _router: Router, private _userService: UserService) {}

  ngOnInit(): void {
    if(this._authService.isLoggedIn())
      this._router.navigate(["/home"]);
  }

  onSubmit(){
    this._userService.create(this.registerForm.value).subscribe(
      response =>{
        if(response.status == 200){
          utils.saveLocalValue("register", "true");
          this._router.navigate(['/login']);
        }
        else{
          this.registerMessage = response.message;
        }
      },
      error =>{
        console.error(error);
      }
    )


  }

}
