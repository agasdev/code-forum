import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, Route } from "@angular/router";
import { User } from "../../models/user";
import { UserService } from "../../services/user.service";
import { global } from "../../services/global";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {
  public pageTitle: string;
  public user: User;
  public identity: User;
  public token: string;
  public status: string;
  public afuConfig: object;
  public url: string;
  public resetVar: boolean;

  constructor(private _userService: UserService, private _router: Router, private _activateRoute: ActivatedRoute) {
    this.pageTitle = "Ajustes de usuario";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.user = this.identity;
    this.url = global.URL;
    this.resetVar = true;
    this.afuConfig = {
      multiple: false,
      formatsAllowed: ".jpg, .jpeg, .png, .gif",
      maxSize: "50",
      uploadAPI: {
        url: this.url + 'upload-avatar',
        headers: {
          "Authorization": this.token
        }
      },
      theme: "attachPin",
      hideProgressBar: false,
      hideResetBtn: true,
      hideSelectBtn: false,
      replaceTexts: {
        attachPinBtn: "Añadir imagen"
      }
    }
  }

  ngOnInit(): void {
  }

  onSubmit(form): void {
    this._userService.update(this.user).subscribe(
      response => {
        if (!response.user) {
          this.status = "error";
        } else {
          this.status = "success";
          localStorage.setItem('identity', JSON.stringify(this.user));
        }
      },
      error => {
        this.status = "error";
        console.log(error);
      }
    );
  }

  avatarUpload(data): void {
    this.user.image = data.body.user.image;
  }

}
