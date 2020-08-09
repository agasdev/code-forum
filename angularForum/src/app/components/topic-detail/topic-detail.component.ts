import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";

import { Topic } from "../../models/topic";
import { TopicService } from "../../services/topic.service";
import { Comment } from "../../models/comment";
import { UserService } from "../../services/user.service";
import { User } from "../../models/user";
import { CommentService } from "../../services/comment.service";
import { global } from "../../services/global";

@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.css'],
  providers: [TopicService, UserService]
})
export class TopicDetailComponent implements OnInit {
  public topic: Topic;
  public comment: Comment;
  public identity: User;
  public token: string;
  public status: string;
  public url: string;

  constructor(private _router: Router, private _route: ActivatedRoute, private _topicService: TopicService,
              private _userService: UserService, private _commentService: CommentService) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.comment = new Comment('', '', '', this.identity._id);
    this.url = global.URL;
  }

  ngOnInit(): void {
    this.getTopic();
  }

  getTopic(): void {
    this._route.params.subscribe(params => {
      this._topicService.getTopic(params['id']).subscribe(
        response => {
          if (response.status === "success") {
            this.topic = response.topic;
          } else {
            this._router.navigate(['/topics']);
          }
        },
        error => {
          console.log(error);
          this._router.navigate(['/topics']);
        }
      );
    });
  }

  onSubmit(form): void {
    this._commentService.add(this.token, this.topic._id, this.comment).subscribe(
      response => {
        if (response.status === "success") {
          this.status = "success";
          this.closeAlert();

          this.topic = response.topic;
          form.reset();
        } else {
          this.status = "error";
          this.closeAlert();
        }
      },
      error => {
        this.status = "error";
        this.closeAlert();
        console.log(error);
      }
    );
  }

  closeAlert() {
    setTimeout(() => {
      this.status = "";
    }, 3000);
  }

  deleteComment(id): void {
    this._commentService.delete(this.token, this.topic._id, id).subscribe(
      response => {
        if (response.status === "success") {
          this.topic = response.topic;
        }
      },
      error => {
        this.status = "error";
        this.closeAlert();
        console.log(error);
      }
    );
  }

}
