import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";

import { Topic } from "../../models/topic";
import { TopicService } from "../../services/topic.service";

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css'],
  providers: [TopicService]
})
export class TopicsComponent implements OnInit {
  public pageTitle: string;
  public topics: Array<Topic>;
  public totalPages: number;
  public page: number;
  public nextPage: number;
  public prevPage: number;
  public numberPages: Array<number>;

  constructor(private _router: Router, private _route: ActivatedRoute, private _topicService: TopicService) {
    this.pageTitle = "Temas";
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.getTopics(!params['page'] ? 1 : parseInt(params['page']));
    });
  }

  getTopics(page = 1): void {
    this._topicService.getTopics(page).subscribe(
      response => {
        if (response.status === "success") {
          this.topics = response.topics;
          this.totalPages = response.totalPages;
          this.page = page;
          this.numberPages = [];
          for (let i = 1; i <= this.totalPages; i++) {
            this.numberPages.push(i);
          }

          this.prevPage = this.page > 1 ? this.page - 1 : 1;
          this.nextPage = this.page < this.totalPages ? this.page + 1 : this.totalPages;


        } else {
          this._router.navigate(['/home']);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
