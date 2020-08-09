import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { TopicService } from "../../services/topic.service";
import { User } from "../../models/user";
import { Topic } from "../../models/topic";
import { global } from "../../services/global";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public user: User;
  public topics: Array<Topic>;
  public url: string;

  constructor(private _router: Router, private _route: ActivatedRoute, private _userService: UserService, private _topicService: TopicService) {
    this.url = global.URL;
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      const userId = params['id'];
      this.getUser(userId);
      this.getTopics(userId);
    });
  }

  getUser(userId): void {
    this._userService.getUser(userId).subscribe(
      response => {
        if (response.status === "success") {
          this.user = response.user;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  getTopics(userId): void {
    this._topicService.getTopicsByUser(userId).subscribe(
      response => {
        if (response.status === "success") {
          this.topics = response.topics;
        }
      },
      error => {
        console.log(error);
      }
    );

  }

}
