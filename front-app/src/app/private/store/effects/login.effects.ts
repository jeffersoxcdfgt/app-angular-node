import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType , Effect } from '@ngrx/effects';
import { map , switchMap  } from 'rxjs/operators';
import { UserService } from '../services/login.service';
import { LoginActionTypes ,  loginUserError } from '../actions/login.actions';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';


@Injectable()
export class UserEffects {
    public logIn$ = createEffect(() =>  this.actions$.pipe(
    ofType(LoginActionTypes.LOGIN_USER),
        switchMap((userdata) => {
          return this.userService.logIn(userdata).pipe(
            map((user) => {
              try {
                if (user.hasOwnProperty('err')){
                  throw user.err.error;
                }
                this.router.navigate(['/user/homeadmin']);
              } catch (error) {
                this.store.dispatch(loginUserError({err: error} ));
              }
              return   ({ type: LoginActionTypes.LOGIN_USER_SUCCESS, user });
              }
            )
          );
        }
      )
    )
  );

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router,
    private store: Store<AppState>
  ) {}
}
