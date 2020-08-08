import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { User } from "../../models/user";
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public pageTitle: string;
  public user: User;
  public status: string;
  public identity: string;
  public  token: string;

  constructor(private _userService: UserService, private _router: Router, private _route: ActivatedRoute) {
    this.pageTitle = "Identifícate";
    this.user = new User('', '', '', '', '', '', 'ROLE_USER');
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.getLoginUser();
  }

  getLoginUser(): void {
    this._userService.login(this.user).subscribe(
      response => {
        if (response.user && response.user._id) {
          this.identity = response.user;
          localStorage.setItem('identity', JSON.stringify(this.identity));
          this.getUserToken();
        } else {
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
        console.log(error);
      }
    );
  }

  getUserToken(): void {
    this._userService.login(this.user, true).subscribe(
      response => {
        if (response.token) {
          this.token = response.token;
          localStorage.setItem('token', this.token);
          this.status = 'success';
          this._router.navigate(['/home']);
        } else {
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
        console.log(error);
      }
    );
  }

}
