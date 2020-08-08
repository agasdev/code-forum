import {Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from "./services/user.service";
import { User } from "./models/user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck {
  public title = 'angularForum';
  public identity: User;
  public token: string;

  constructor(private _userService: UserService) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    console.log(this.identity);
    console.log(this.token);
  }

  ngDoCheck(): void {
    this.identity = this._userService.getIdentity();
  }

}
