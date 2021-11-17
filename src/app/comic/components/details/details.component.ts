import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params }  from '@angular/router';
import { ComicService } from "../../services/comic.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Comic} from "../../../models/comic";
import * as utils  from "../../../shared/utils";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  id: number = 0;
  comicMessage: string = "";
  comic: Comic;
  token: any;

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

  constructor(private _route:ActivatedRoute, private _router:Router, private _comicService: ComicService) {
    this.comic = new Comic(0,"","","","","","","","","","","");
    this.token = utils.getUserSession();
  }

  ngOnInit(): void {
    this.getComicId();
    this.getComicMetadata();
    this.updateForm();
  }

  getComicId(){
    this._route.params.subscribe(params =>{
      this.id = params['id'];
    })
  }

  getComicMetadata(){
    this._comicService.getById(this.id).subscribe(
      response =>{
        this.updateComic(response);
        console.log(response)
        this.updateForm()
      },
      error =>{
        console.error(error)
      }
    )
  }

  updateComic(object: any){
    this.comic.id = object.id;
    this.comic.month = object.month;
    this.comic.num = object.num;
    this.comic.link = object.link;
    this.comic.year = object.year;
    this.comic.news = object.news;
    this.comic.safe_title = object.safe_title;
    this.comic.transcript = object.transcript;
    this.comic.alt = object.alt;
    this.comic.img = object.img;
    this.comic.title = object.title;
    this.comic.day = object.day;
  }

  updateForm(){
    this.comicForm.setValue({
      month: this.comic.month,
      num: this.comic.num,
      link:  this.comic.link,
      year: this.comic.year,
      news: this.comic.news,
      safe_title: this.comic.safe_title,
      transcript: this.comic.transcript,
      alt: this.comic.alt,
      img: this.comic.img,
      title: this.comic.title,
      day: this.comic.day,
    });
  }

  onSubmit(){
    this.comicForm.value.id = this.id;
    this._comicService.create(this.comicForm.value, this.token).subscribe(
      response =>{
          this.comicMessage = "The comic was updated successfully"
          window.scrollTo(0, 0);
      },
      error =>{
        console.error(error);
        utils.clearSessionToken();
        this._router.navigate(['login']);
      }
    )
  }

}
