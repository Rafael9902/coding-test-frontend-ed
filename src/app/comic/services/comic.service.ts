import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { global} from "../../shared/global";


@Injectable()
export class ComicService{
  public url: string;

  constructor(public _http: HttpClient) {
    this.url = global.url;
  }

  get(tag: string): Observable<any>{
    return this._http.get(this.url + "comic?tag=" + tag);
  }

  getById(id: number): Observable<any>{
    return this._http.get(this.url + "comic/" + id);
  }

  create(comic: any, token: string): Observable<any>{
    let json = JSON.stringify(comic);

    let headers = new HttpHeaders({
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json"
    })

    return this._http.post(this.url + "comic", json, {headers: headers});
  }



}
