import { createAction, props } from '@ngrx/store';
import { User } from '../../shared/user';

export enum LoginActionTypes {
  LOGIN_USER = '[Login] Login user',
  LOGIN_USER_SUCCESS = '[Login sucess] Login user sucess',
  LOGIN_USER_ERROR = '[Login error] Login user error',
  IS_USER_LOGGED = '[User logged] Is user is logged',
  IS_USER_LOGGED_SUCESS = '[User logged sucess] Is user is logged sucess',
  IS_USER_LOGGED_ERROR = '[User logged error] Is user is logged error'
}

// Loggin user
export const loginUser = createAction(LoginActionTypes.LOGIN_USER, props<{user: User} >());
export const loginUserSuccess = createAction(LoginActionTypes.LOGIN_USER_SUCCESS, props<{user: User}>());
export const loginUserError = createAction(LoginActionTypes.LOGIN_USER_ERROR, props<{err: Error}>());

//Verify is user is logged

export const userIslogged = createAction(LoginActionTypes.IS_USER_LOGGED , props<{user: string} >());
export const userIsloggedSuccess = createAction(LoginActionTypes.IS_USER_LOGGED_SUCESS, props<{user: boolean}>());
export const userIsloggedError = createAction(LoginActionTypes.IS_USER_LOGGED_ERROR, props<{err: Error}>());
