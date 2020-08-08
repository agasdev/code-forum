import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";

import { Topic } from "../../../../models/topic";
import { UserService } from "../../../../services/user.service";
import { User } from "../../../../models/user";
import { TopicService } from "../../../../services/topic.service";

@Component({
  selector: 'app-edit',
  templateUrl: '../add/add.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [TopicService]
})
export class EditComponent implements OnInit {
  public pageTitle: string;
  public topic: Topic;
  public identity: User;
  public token: string;
  public status: string;
  public isEdit: boolean;

  constructor(private _router: Router, private _route: ActivatedRoute, private _userService: UserService,
              private _topicService: TopicService) {
    this.pageTitle = "Editar tema";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.topic = new Topic("", "", "", "", "", "", this.identity._id, null);
    this.isEdit = true;
  }

  ngOnInit(): void {
    this.getTopic();
  }

  getTopic(): void {
    this._route.params.subscribe((params: Params) => {
      this._topicService.getTopic(params['id']).subscribe(
        response => {
          if (response.status === "success") {
            this.topic = response.topic;
          } else {
            this._router.navigate(['/panel']);
          }
        },
        error => {
          console.log(error);
          this._router.navigate(['/panel']);
        }
      );
    });
  }

  onSubmit(form): void {
    this._topicService.update(this.token, this.topic._id, this.topic).subscribe(
      response => {
        if (response.status === "success") {
          this.status = "success";
          this.topic = response.topic;
          form.reset();
          this._router.navigate(['/panel']);
        } else {
          this.status = "error";
        }
      },
      error => {
        console.log(error);
        this.status = "error";
      }
    );
  }
}
