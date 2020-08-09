import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";

import { Topic } from "../../models/topic";
import { TopicService } from "../../services/topic.service";

@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.css'],
  providers: [TopicService]
})
export class TopicDetailComponent implements OnInit {
  public topic: Topic;

  constructor(private _router: Router, private _route: ActivatedRoute, private _topicService: TopicService) { }

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

}
