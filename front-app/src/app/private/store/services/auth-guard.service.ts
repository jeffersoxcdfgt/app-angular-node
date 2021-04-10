import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './login.service';


@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    public auth: UserService,
    public router: Router
  ) {}
  canActivate(): boolean {
    const userdata = JSON.parse(this.auth.getToken());
    if (
    userdata !== null &&
    userdata.hasOwnProperty('selected')
    && userdata.selected.status === 'success'){
        return true;
     }
    return false;
  }
}
