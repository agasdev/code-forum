import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";

import { Topic } from "../../../../models/topic";
import { UserService } from "../../../../services/user.service";
import { User } from "../../../../models/user";
import { TopicService } from "../../../../services/topic.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [UserService, TopicService]
})
export class ListComponent implements OnInit {
  public pageTitle: string;
  public topics: Array<Topic>;
  public identity: User;
  public token: string;
  public status: string;

  constructor(private _router: Router, private _route: ActivatedRoute, private _userService: UserService,
              private _topicService: TopicService) {
    this.pageTitle = "Mis temas";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    this.getTopicsByUser();
  }

  getTopicsByUser(): void {
    this._topicService.getTopicsByUser(this.identity._id).subscribe(
      response => {
        if (response.status === "success") {
          this.status = "success";
          this.topics = response.topics;
          console.log(this.topics);
        } else {
          this.status = "error";
        }
      },
      error => {
        this.status = "error";
        console.log(error);
      }
    );
  }

}
