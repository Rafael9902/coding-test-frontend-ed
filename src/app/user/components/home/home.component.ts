import { Component, OnInit } from '@angular/core';
import * as utils  from "../../../shared/utils";
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService} from "../../../auth/auth.service";
import {ComicService} from "../../../comic/services/comic.service";
import {UserService} from "../../services/user.service";
import {User} from "../../../models/user";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: any;
  tag: string = "";
  comics: any = []

  constructor(private _router: Router, private _authService: AuthService, private _route: ActivatedRoute,
              private  _comicService: ComicService, private _userService: UserService) { }

  ngOnInit(): void {
    if(!this._authService.isLoggedIn())
      this._router.navigate(["/login"]);

    if(utils.getLocalValue("login") == "true"){
      utils.clearLocalStorage();
      window.location.reload();
    }

    this.getUser();
    this.getParams();
    this.getComics()
  }

  getUser(){
    let token = utils.getUserSession();
    this._userService.get(token).subscribe(
      response =>{
        this.user = new User(response.id, response.first_name, response.last_name, response.email, response.password)
      },
      error =>{
        console.error(error);
      }
    )

  }

  getParams(){
    this._route.queryParams.subscribe(params => {
      this.tag = params['tag'];
    });
  }

  getComics(){
   this._comicService.get(this.tag).subscribe(
     response =>{
       this.comics = response;
       console.log(response);
     },
     error =>{
       console.error(error);
     }
   )
  }

  getComic(comicId: number){
    this._router.navigate(['comic/'+ comicId])
  }

}
