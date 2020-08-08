import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { User } from "../../models/user";
import { UserService } from "../../services/user.service";
import {global} from "../../services/global";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input('identity') identity: User;
  public url: string;

  constructor(private _userServive: UserService, private _router: Router, private _activatedRoute: ActivatedRoute) {
    this.url = global.URL;
  }

  ngOnInit(): void {
  }

  logout(): void {
    this._userServive.logout();
    this._router.navigate(['/home']);
  }

}
