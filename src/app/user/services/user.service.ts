import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { global} from "../../shared/global";


@Injectable()
export class UserService{
  public url: string;

  constructor(public _http: HttpClient) {
    this.url = global.url;
  }

  create(user: any): Observable<any>{
    let json = JSON.stringify(user);
    let headers = new HttpHeaders().set("Content-Type", "application/json");

    return this._http.post(this.url + "user", json, {headers: headers});
  }

  get(token: string | null): Observable<any>{
    let headers = new HttpHeaders().set("Authorization", "Bearer " + token);

    return this._http.get(this.url + "user", {headers: headers});
  }

  update(user: any): Observable<any>{
    let json = JSON.stringify(user);
    let headers = new HttpHeaders().set("Content-Type", "application/json");

    return this._http.post(this.url + "user", json, {headers: headers});
  }

}
