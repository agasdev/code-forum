import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public pageTitle: string;

  constructor() {
    this.pageTitle = "Foro de programación";
  }

  ngOnInit(): void {
  }

}
