import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public url: string;

  constructor(private _router: Router) {
    _router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        this.url = event.url;
      }
    });
  }

  ngOnInit(): void { }

  getClass(str): string {
    let className: string = "";
    switch (this.url) {
      case '/panel':
      case '/panel/list':
        className = str === 'list' ? "nav-link active" : "nav-link";
        break;
      case '/panel/create':
        className = str === 'create' ? "nav-link active" : "nav-link";
        break;
      default:
        className = "nav-link";
    }

    return className;
  }

}
