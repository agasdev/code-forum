import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { User } from "../../models/user";
import { global } from "../../services/global";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserService]
})
export class UsersComponent implements OnInit {
  public pageTitle: string;
  public users: Array<User>;
  public url: string;

  constructor(private _userService: UserService) {
    this.pageTitle = 'Comunidad de usuarios';
    this.url = global.URL;
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this._userService.getUsers().subscribe(
      response => {
        if (response.status === "success") {
          this.users = response.users;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
