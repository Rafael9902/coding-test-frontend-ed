import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { global} from "../shared/global";
import * as utils from "../shared/utils";

@Injectable()
export class AuthService {
  public url: string;

  constructor(public _http: HttpClient) {
    this.url = global.url;
  }

  login(credentials: any): Observable<any> {
    let json = JSON.stringify(credentials);
    let headers = new HttpHeaders().set("Content-Type", "application/json");

    return this._http.post(this.url + "user/login", json, {headers: headers})
  }

  isLoggedIn(){
    return !!utils.getUserSession();
  }

}
