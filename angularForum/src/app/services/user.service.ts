import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/user";
import { global } from "./global";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public url: string;

  constructor(private _http: HttpClient) {
    this.url = global.URL;
  }

  register(user: User): Observable<any> {
    const params = JSON.stringify(user);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url + 'register', params, {headers: headers});
  }

  login(user: User, getToken: any = null): Observable<any> {
    let object: any = user;
    if (getToken !== null) {
      object.getToken = getToken;
    }

    const params = JSON.stringify(user);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url + 'login', params, {headers: headers});
  }

}
