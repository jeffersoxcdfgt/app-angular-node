import { createAction, props } from '@ngrx/store';
import { User } from '../../shared/user';

export enum UserActionTypes {
  GET_USERS = '[All] Users',
  GET_USERS_SUCCESS = '[ALL] Users Success',
  GET_USERS_ERROR = '[All] Users Error',
  CREATE_USER ='[Create] User',
  CREATE_USER_SUCCESS = '[Create] User Sucess',
  CREATE_USER_ERROR = '[Create] User Error',
  UPDATE_USER = '[Update] User',
  UPDATE_USER_SUCCESS = '[Update] User Success',
  UPDATE_USER_ERROR = '[Update] User Error',
  GET_USER = '[GET] User',
  GET_USER_SUCCESS = '[GET] User Succes',
  GET_USER_ERROR = '[GET] User Error',
  DELETE_USER = '[Delete] User',
  DELETE_USER_SUCCESS = '[Delete] User Success',
  DELETE_USER_ERROR = '[Delete] User Error'
}

//list Users

export const userGetAll = createAction(UserActionTypes.GET_USERS);
export const userGetAllSuccess = createAction(UserActionTypes.GET_USERS_SUCCESS, props<{users: User[]}>());
export const userGetAllError = createAction(UserActionTypes.GET_USERS_ERROR, props<{err: Error}>());

//Create user

export const userCreate = createAction(UserActionTypes.CREATE_USER, props<{user: User} >());
export const userCreateSuccess = createAction(UserActionTypes.CREATE_USER_SUCCESS, props<{user: User}>());
export const userCreateError = createAction(UserActionTypes.CREATE_USER_ERROR, props<{err: Error}>());

//Update user

export const userUpdate = createAction(UserActionTypes.UPDATE_USER, props<{user: User} >());
export const userUpdateSuccess = createAction(UserActionTypes.UPDATE_USER_SUCCESS);
export const userUpdateError = createAction(UserActionTypes.UPDATE_USER_ERROR, props<{err: Error}>());

//Get user
export const userGet = createAction(UserActionTypes.GET_USER, props<{user: number}>());
export const userGetSuccess = createAction(UserActionTypes.GET_USER_SUCCESS, props<{user: User} >());
export const userGetError = createAction(UserActionTypes.GET_USER_ERROR, props<{err: Error}>());

//Delete user
export const userDelete = createAction(UserActionTypes.DELETE_USER, props<{user: number}>());
export const userDeleteSuccess = createAction(UserActionTypes.DELETE_USER_SUCCESS, props<{user: User} >());
export const userDeleteError = createAction(UserActionTypes.DELETE_USER_ERROR, props<{err: Error}>());
