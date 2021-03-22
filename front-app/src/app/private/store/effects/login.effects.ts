import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType , Effect } from '@ngrx/effects';
import { EMPTY , of , throwError } from 'rxjs';
import { map, mergeMap, catchError , tap  , switchMap, filter , exhaustMap   } from 'rxjs/operators';
import { iif } from 'rxjs';
import { UserService } from '../services/login.service';
import { User } from '../../shared/user';
import { UserActionTypes ,  userCreateError } from '../actions/login.actions';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';


@Injectable()
export class UserEffects {

  
  public loadUsers$ = createEffect(() => this.actions$.pipe(
    ofType(UserActionTypes.GET_USERS),
    mergeMap(() => this.userService.findAll()
      .pipe(
        map((users:User[]) => ({ type: UserActionTypes.GET_USERS_SUCCESS, users: users })),
         catchError(err => of({ type: UserActionTypes.GET_USERS_ERROR, err: err }))
      ))
    )
  );


  public createUser$ = createEffect(() =>  this.actions$.pipe(
  ofType(UserActionTypes.CREATE_USER),
      switchMap((user) => {
        return this.userService.insert(user).pipe(
          map((user) => {
            try {
              if(user.hasOwnProperty('err')){
                 throw user['err']['error']
              } 
              this.router.navigate(['/user/homeadmin'])          
            } catch (error) {
               this.store.dispatch(userCreateError({err: error} ));
            }
            return   ({ type: UserActionTypes.CREATE_USER_SUCCESS, user: user })  
            }
          )
        )
      }
    )
  )
);
  

  //@Effect()
  public updateUser$ = createEffect(() => this.actions$.pipe(
    ofType(UserActionTypes.UPDATE_USER),
    mergeMap((user) => this.userService.update(user)
      .pipe(
        map((user:User) => ({ type: UserActionTypes.UPDATE_USER_SUCCESS })),
            catchError(err => of({ type: UserActionTypes.UPDATE_USER_ERROR, err: err }))
      ))
    )
  );

  //@Effect()
  public getUser$ = createEffect(() => this.actions$.pipe(
    ofType(UserActionTypes.GET_USER),
    mergeMap((user) => this.userService.findById(user)
      .pipe(
        map((user:User) => ({ type: UserActionTypes.GET_USER_SUCCESS, user: user })),
          catchError(err => of({ type: UserActionTypes.GET_USER_ERROR, err: err }))
      ))
    )
  );

  //@Effect()
  public deleteUser$ = createEffect(() => this.actions$.pipe(
    ofType(UserActionTypes.DELETE_USER),
    mergeMap((user) => this.userService.delete(user)
      .pipe(
        map((user:User) => ({ type: UserActionTypes.DELETE_USER_SUCCESS, user: user })),
          catchError(err => of({ type: UserActionTypes.DELETE_USER_ERROR, err: err }))
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router,
    private store: Store<AppState>
  ) {}
}
