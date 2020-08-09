import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";

import { Topic } from "../../../../models/topic";
import { UserService } from "../../../../services/user.service";
import { User } from "../../../../models/user";
import { TopicService } from "../../../../services/topic.service";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  providers: [UserService, TopicService]
})
export class AddComponent implements OnInit {
  public pageTitle: string;
  public topic: Topic;
  public identity: User;
  public token: string;
  public status: string;
  public isEdit: boolean;

  constructor(private _router: Router, private _route: ActivatedRoute, private _userService: UserService,
              private _topicService: TopicService) {
    this.pageTitle = "Crear nuevo tema";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.topic = new Topic("", "", "", "", "", "", this.identity._id, null);
    this.isEdit = false;
  }

  ngOnInit(): void {
  }

  onSubmit(form): void {
    this._topicService.addTopic(this.token, this.topic).subscribe(
      response => {
        if (response.topic) {
          this.status = "success";
          this.topic = response.topic;
          form.reset();
          this._router.navigate(['/panel']);
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
