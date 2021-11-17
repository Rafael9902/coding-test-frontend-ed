import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../auth/auth.service";
import {FormControl, FormGroup} from "@angular/forms";
import { Router } from "@angular/router";
import * as utils  from "../../../shared/utils";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public isLogged: boolean = false;

  public searchForm = new FormGroup({
    tag: new FormControl('')
  });

  constructor(private _authService: AuthService, private _router: Router) { }

  ngOnInit(): void {
    if(this._authService.isLoggedIn())
      this.isLogged = true;
  }

  onSubmit() {
    this.reloadCurrentRoute()
  }

  reloadCurrentRoute() {
    let currentUrl = this._router.url;

    this._router.navigateByUrl('/login', { skipLocationChange: true }).then(() => {
      this._router.navigate(['home'],{queryParams: {"tag": this.searchForm.value.tag}});
    });
  }

  logout(){
    utils.clearSessionToken();
    this._router.navigate(['login']);
  }


}
