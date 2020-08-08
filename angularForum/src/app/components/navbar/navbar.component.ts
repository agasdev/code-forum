import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { User } from "../../models/user";
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input('identity') identity: User;

  constructor(private _userServive: UserService, private _router: Router, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  logout(): void {
    this._userServive.logout();
    this._router.navigate(['/home']);
  }

}
