import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class NoIdentityGuard implements CanActivate {

  constructor(private _router: Router, private _userService: UserService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const identity = this._userService.getIdentity();

    if (identity && identity._id) {
      this._router.navigate(['/topics']);
      return false;
    }

    return true;
  }
}
