import { createAction, props } from '@ngrx/store';
import { User } from '../../shared/user';

export enum LoginActionTypes {
  LOGIN_USER = '[Login] Login user',
  LOGIN_USER_SUCCESS = '[Login sucess] Login user sucess',
  LOGIN_USER_ERROR = '[Login error] Login user error'
}

// Loggin user
export const loginUser = createAction(LoginActionTypes.LOGIN_USER, props<{user: User} >());
export const loginUserSuccess = createAction(LoginActionTypes.LOGIN_USER_SUCCESS, props<{user: User}>());
export const loginUserError = createAction(LoginActionTypes.LOGIN_USER_ERROR, props<{err: Error}>());

