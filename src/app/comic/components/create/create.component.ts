import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { ComicService } from "../../services/comic.service";
import {AuthService} from "../../../auth/auth.service";
import * as utils  from "../../../shared/utils";


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  userToken: any = "";
  createMessage: string = "";

  comicForm = new FormGroup({
    month: new FormControl(''),
    num: new FormControl(''),
    link:  new FormControl(''),
    year: new FormControl(''),
    news: new FormControl(''),
    safe_title: new FormControl(''),
    transcript: new FormControl(''),
    alt: new FormControl(''),
    img: new FormControl(''),
    title: new FormControl(''),
    day: new FormControl(''),
  });

  constructor(private _comicService: ComicService) {
    this.userToken = utils.getUserSession();
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this._comicService.create(this.comicForm.value, this.userToken).subscribe(
      response =>{
        console.log(this.comicForm.value);
        this.createMessage = response.message
        window.scrollTo(0, 0);
      },
      error =>{
        console.error(error);
      }
    )
  }

}
