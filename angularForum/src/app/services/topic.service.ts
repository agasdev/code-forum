import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { global } from "./global";

import { Topic } from "../models/topic";

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  public url: string;

  constructor(private _http: HttpClient) {
    this.url = global.URL;
  }

  addTopic(token, topic: Topic): Observable<any> {
    const params = JSON.stringify(topic);
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);

    return this._http.post(this.url + 'topic', params, {headers: headers});
  }
}
