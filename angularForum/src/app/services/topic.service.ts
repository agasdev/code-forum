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

  getTopicsByUser(userId): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.get(this.url + 'topics-user/' + userId, {headers: headers});
  }

  getTopic(topicId): Observable<any> {
    return this._http.get(this.url + 'topic/' + topicId);
  }

  update(token, id, topic: Topic): Observable<any> {
    const params = JSON.stringify(topic);
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);

    return this._http.put(this.url + 'topic/' + id, params, {headers: headers});
  }

  deleteTopic(token, id): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);

    return this._http.delete(this.url + 'topic/' + id, {headers: headers});
  }

  getTopics(page = 1): Observable<any> {
    return this._http.get(this.url + 'topics/' + page);
  }
}
