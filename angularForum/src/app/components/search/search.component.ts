import { Component, OnInit } from '@angular/core';
import { TopicService } from "../../services/topic.service";
import { Topic } from "../../models/topic";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: '../topics/topics.component.html',
  styleUrls: ['./search.component.css'],
  providers: [TopicService]
})
export class SearchComponent implements OnInit {
  public pageTitle: string;
  public topics: Array<Topic>;
  public noPaginate: boolean;

  constructor(private _router: Router, private _route: ActivatedRoute, private _topicService: TopicService) {
    this.noPaginate = true;
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.getTopicsBySearch(params['search']);
    });
  }

  getTopicsBySearch(search): void {
    this.pageTitle = "Resultados de: " + search;
    this._topicService.search(search).subscribe(
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
