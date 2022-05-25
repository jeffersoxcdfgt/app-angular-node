import { Injectable } from '@angular/core';
import { Actions, createEffect,  ofType  } from '@ngrx/effects';
import { catchError, exhaustMap, map , switchMap, tap } from 'rxjs/operators';
import { UserService } from '../services/login.service';
import { LoginActionTypes ,  loginUserError } from '../actions/login.actions';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import * as storage from '../../shared/storage';
import { User } from '../../shared/user';
import { of } from 'rxjs';


@Injectable()
export class UserEffects {

    /*public logIn$ = createEffect(() =>  this.actions$.pipe(
    ofType(LoginActionTypes.LOGIN_USER),
        switchMap((userdata) => {
          return this.userService.logIn(userdata).pipe(
            map((user) => {
              try {
                debugger
                if (user.hasOwnProperty('err')){
                  throw user.err.error;
                }
                this.router.navigate(['/user/menu']);
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
  );*/


  public logIn$ = createEffect(() =>  this.actions$.pipe(
    ofType(LoginActionTypes.LOGIN_USER),
        exhaustMap((userdata) => this.userService.logIn(userdata).pipe(
            map(userinf => ({type: LoginActionTypes.LOGIN_USER_SUCCESS, user: userinf})),
             catchError((errdata) => of({ type: LoginActionTypes.LOGIN_USER_ERROR, err: {...errdata.error}}))
          )
      )
    )
  );

  public loginSuccess$ = createEffect(() =>  this.actions$.pipe(
    ofType(LoginActionTypes.LOGIN_USER_SUCCESS),
     tap((_) => this.router.navigate(['/user/menu']))),
    { dispatch: false }
  );


  public logOut$ = createEffect(() =>   this.actions$.pipe(
    ofType(LoginActionTypes.LOGOUT),
       map((_) => {
          storage.clearStorage();
          this.router.navigate(['/user']);
          return  ({ type: LoginActionTypes.LOGOUT});
       })
  ),
  { dispatch: false }
  );



  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router,
    private store: Store<AppState>
  ) {}

}
